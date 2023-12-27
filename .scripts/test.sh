set -e 

cd $(dirname $0)/..
ROOT=$(pwd)

# Set the default value for $1 to "pnpm" if it's not provided
PACKAGE_MANAGER="${1:-pnpm}"

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

    $PACKAGE_MANAGER install --prefer-offline
    $PACKAGE_MANAGER run build 
done
