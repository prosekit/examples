set -e 

cd $(dirname $0)/..
ROOT=$(pwd)

mkdir -p ./.temp
rm -rf ./.temp

for file in $(find "$ROOT" -name 'package.json' -not -path '*/node_modules/*' | sort)
do 
    cd $(dirname $file)
    echo "Testing $PWD"

    # Ignore some examples that are not working yet
    base=$(basename "$PWD")
    if [[ "$base" == "vue-code-block" ]]; then
        continue
    fi
    if [[ "$base" == "react-code-block" ]]; then
        continue
    fi
    if [[ "$base" == "lit-dom" ]]; then
        continue
    fi
    if [[ "$base" == "react-slash-menu" ]]; then
        continue
    fi
    if [[ "$base" == "vue-full" ]]; then
        continue
    fi
    if [[ "$base" == "vue-inline-menu" ]]; then
        continue
    fi
    if [[ "$base" == "vue-slash-menu" ]]; then
        continue
    fi
    if [[ "$base" == "vue-keymap" ]]; then
        continue
    fi

    pnpm install --prefer-offline
    pnpm run build 
done 
