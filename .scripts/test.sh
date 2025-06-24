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

    if [ "$PACKAGE_MANAGER" == "yarn" ]; then
        echo "Sleeping for 240 seconds"
        for i in {1..240}; do
            echo "Sleeping for $i seconds"
            sleep 1
        done
        exit 1
    fi

    $PACKAGE_MANAGER install --prefer-offline

    $PACKAGE_MANAGER run build 
done
