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

git config --add --bool push.autoSetupRemote true
git checkout -b update-prosekit-$target-$(date +%Y%m%d%H%M%S)
git commit -am "feat: update prosekit to $target"
git push
gh pr create --draft --title "feat: update prosekit to $target" --body "Update prosekit to $target"
