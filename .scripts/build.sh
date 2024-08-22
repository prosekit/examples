#!/usr/bin/env bash

set -ex 

cd $(dirname $0)/..
ROOT=$(pwd)

mkdir -p ./.temp/prosekit
rm -rf ./.temp/prosekit
git clone --depth 1 https://github.com/ocavue/prosekit --branch ocavue/fix-loro-example ./.temp/prosekit

for file in $(find $ROOT/.temp/prosekit/playground/examples/ -type f)
do 
    node .scripts/replace-class-names.mjs "$file"
done

function sync_example() {
    # ProseKit example directory to copy from
    local source_dir=$1
    # Framework template directory to copy from
    local template_dir=$2
    # Target directory to copy to
    local target_dir=$3
    # Optional sub directory for the target, defaults to "src/"
    local target_src_dir=${4:-"src/"}

    local target_pkg_json="${target_dir}package.json"
    local target_src_pkg_json="${target_dir}${target_src_dir}package.json"
    local tmp=$(mktemp)

    rm -rf "$target_dir"

    rsync --exclude 'node_modules' -av "$template_dir" "$target_dir"
    rsync --exclude 'node_modules' -av "$source_dir" "${target_dir}${target_src_dir}"

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
    for source_dir in ./.temp/prosekit/playground/examples/$framework/*/
    do
        template_dir="./.templates/template-$framework/"
        target_dir="./${framework}-$(basename "$source_dir")/"
        sync_example "$source_dir" "$template_dir" "$target_dir"
    done
done

sync_example ./.temp/prosekit/playground/examples/vue/full/ ./.templates/template-nuxt/ ./nuxt-full/

sync_example ./.temp/prosekit/playground/examples/react/toolbar/ ./.templates/template-next/ ./next-full/

sync_example ./.temp/prosekit/playground/examples/svelte/full/ ./.templates/template-sveltekit/ ./sveltekit-full/ src/lib/

rsync --exclude 'node_modules' -av "./.overrides/" "./"
