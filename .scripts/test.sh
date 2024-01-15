set -e 

cd $(dirname $0)/..
ROOT=$(pwd)

PACKAGE_MANAGER="${1}"
echo "Using package manager $PACKAGE_MANAGER"

TEST_DIR="${2}"
echo "Testing directory $TEST_DIR"

mkdir -p ./.temp
rm -rf ./.temp

cd "$TEST_DIR"

# Ignore some examples that are not working yet
base=$(basename "$PWD")
if [[ "$base" == "vue-code-block" ]]; then
    exit 0
fi
if [[ "$base" == "react-code-block" ]]; then
    exit 0
fi
if [[ "$base" == "lit-dom" ]]; then
    exit 0
fi
if [[ "$base" == "react-slash-menu" ]]; then
    exit 0
fi
if [[ "$base" == "vue-full" ]]; then
    exit 0
fi
if [[ "$base" == "vue-inline-menu" ]]; then
    exit 0
fi
if [[ "$base" == "vue-slash-menu" ]]; then
    exit 0
fi
if [[ "$base" == "vue-keymap" ]]; then
    exit 0
fi

$PACKAGE_MANAGER install --prefer-offline
$PACKAGE_MANAGER run build 
