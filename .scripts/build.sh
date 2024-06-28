#!/usr/bin/env bash

set -ex 

cd $(dirname $0)/..
ROOT=$(pwd)

mkdir -p ./.temp/prosekit
rm -rf ./.temp/prosekit
git clone --depth 1 https://github.com/ocavue/prosekit ./.temp/prosekit

for file in $ROOT/.temp/prosekit/playground/examples/**/*
do 
    node .scripts/replace-class-names.mjs "$file"
done

function sync_example() {
    local source_dir=$1
    local template_dir=$2
    local target_dir=$3
    local target_pkg_json="${target_dir}package.json"
    local target_src_pkg_json="${target_dir}src/package.json"
    local tmp=$(mktemp)

    rsync --exclude 'node_modules' -av "$template_dir" "$target_dir"
    rsync --exclude 'node_modules' -av "$source_dir" "${target_dir}src/"

    if test -f "$target_src_pkg_json"; then
        # Merge two package.json files
        jq -s '.[0] * .[1]' "$target_pkg_json" "$target_src_pkg_json" > "$tmp"
        mv "$tmp" "$target_pkg_json"
        rm "$target_src_pkg_json"
    fi

    # Alter the package.json and change the "name" field
    example_name=$(basename "$target_dir")
    jq ".name = \"example-${example_name}\"" "$target_pkg_json" > "$tmp"
    mv "$tmp" "$target_pkg_json"
}

for framework in lit preact react solid svelte vanilla vue 
do 
    rm -rf ./$framework-*
    for source_dir in ./.temp/prosekit/playground/examples/$framework-*/
    do
        template_dir="./.templates/template-$framework/"
        target_dir="./$(basename "$source_dir")/"
        sync_example "$source_dir" "$template_dir" "$target_dir"
    done
done

rm -rf ./nuxt-full
sync_example ./.temp/prosekit/playground/examples/vue-full/ ./.templates/template-nuxt/ ./nuxt-full/

rm -rf ./next-full
sync_example ./.temp/prosekit/playground/examples/react-toolbar/ ./.templates/template-next/ ./next-full/
