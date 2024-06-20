#!/usr/bin/env bash

set -e 

cd $(dirname $0)/..
ROOT=$(pwd)

# Get the target from the first argument. Default to "latest"
target="${1:-latest}"

for temp_dir in $(ls -d $ROOT/.templates/template*); do
    cd $temp_dir
    echo "Updating $(dirname $temp_dir)"
    pnpm add prosekit@$target
done

git checkout -b update-prosekit-$target-$(date +%Y%m%d%H%M%S)
git commit -m "Update prosekit to $target"
git push --set-upstream origin update-prosekit-$target
gh pr create --title "feat: update prosekit to $target"
