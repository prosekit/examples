#!/usr/bin/env bash

set -e 

cd $(dirname $0)/..
ROOT=$(pwd)

# First argument is the package manager to use
PACKAGE_MANAGER="${1}"
echo "Using package manager $PACKAGE_MANAGER"
$PACKAGE_MANAGER --version

# Rest of the arguments are the directories to test
TEST_DIRS="${@:2}"

for TEST_DIR in $TEST_DIRS; do
    echo "##################################################################"
    echo "Testing directory $TEST_DIR"
    echo "##################################################################"
    echo ""
    cd "$ROOT"
    cd "$TEST_DIR"

    $PACKAGE_MANAGER install --prefer-offline

    # If the package manager is yarn v1, we need to run special commands to 
    # ensure that the version range "^0.0.0-next" won't install "0.0.0".
    if [ "$PACKAGE_MANAGER" = "yarn" ]; then
        # Install yarn-deduplicate if it's not already installed
        if ! yarn-deduplicate --version > /dev/null 2>&1; then
            echo "Installing yarn-deduplicate"
            yarn global add yarn-deduplicate
        fi
        yarn-deduplicate --strategy fewer
        yarn install --prefer-offline
    fi

    $PACKAGE_MANAGER run build 
done
