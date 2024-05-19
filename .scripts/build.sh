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

for framework in lit preact react solid svelte vanilla vue 
do 
    rm -rf ./$framework-*
    for source_dir in ./.temp/prosekit/playground/examples/$framework-*/
    do
        base=$(basename "$source_dir")

        target_dir="./$base/"
        template_dir="./.templates/template-$framework/"

        rsync --exclude 'node_modules' -av "$template_dir" "$target_dir"
        rsync --exclude 'node_modules' -av "$source_dir" "${target_dir}src/"

        if test -f "${target_dir}src/package.json"; then
            jq -s '.[0] * .[1]' "${template_dir}package.json" "${target_dir}src/package.json" > ./.temp/package.json.json 
            mv ./.temp/package.json.json "${target_dir}package.json"
            rm "${target_dir}src/package.json"
        fi
    done
done
