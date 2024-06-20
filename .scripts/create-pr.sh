#!/usr/bin/env bash

set -e 

cd $(dirname $0)/..
ROOT=$(pwd)

# Get the target from the first argument. Default to "latest"
target="${1:-latest}"

git checkout master
branch_local="update-$target-$(date +%Y%m%d%H%M%S)"
branch_remote="update-$target"

git checkout -b "$branch_local"

for temp_dir in $(ls -d $ROOT/.templates/template*); do
    cd $temp_dir
    echo "Updating $$temp_dir"
    pnpm add prosekit@$target
done
git commit -am "feat: update prosekit to $target"
git push origin -f HEAD:"$branch_remote"
git checkout $branch_remote
git reset --hard origin/$branch_remote
gh pr create --draft --title "feat: update prosekit to $target" --body "Update prosekit to $target"
