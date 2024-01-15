# Output all directories with package.json files in them, in JSON format.

set -e 

cd $(dirname $0)/..
ROOT=$(pwd)

find "$ROOT" -name 'package.json' -not -path '*/node_modules/*' | sort | xargs dirname | jq --raw-input --slurp --compact-output 'split("\n")[:-1]'
