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

    rsync --exclude 'node_modules' -av "$template_dir" "$target_dir"
    rsync --exclude 'node_modules' -av "$source_dir" "${target_dir}src/"

    if test -f "${target_dir}src/package.json"; then
        # Merge two package.json files
        jq -s '.[0] * .[1]' "${template_dir}package.json" "${target_dir}src/package.json" > ./.temp/package.json 
        mv ./.temp/package.json "${target_dir}package.json"
        rm "${target_dir}src/package.json"
    fi
}

for framework in lit preact react solid svelte vanilla vue 
do 
    rm -rf ./$framework-*
    for source_dir in ./.temp/prosekit/playground/examples/$framework-*/
    do
        template_dir="./.templates/framework-$framework/"
        target_dir="./$(basename "$source_dir")/"
        sync_example "$source_dir" "$template_dir" "$target_dir"
    done
done

rm -rf ./nuxt-full
sync_example ./.temp/prosekit/playground/examples/vue-full/ ./.templates/template-nuxt/ ./nuxt-full/
