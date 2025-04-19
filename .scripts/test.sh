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

    # If the package manager is yarn v1, and TEST_DIR contains "preact", we need
    # to install package "magic-string" as a workaround for
    # https://github.com/preactjs/vite-prerender-plugin/issues/16
    if [ "$PACKAGE_MANAGER" = "yarn" ] && [[ "$TEST_DIR" == *"preact"* ]]; then
        yarn add magic-string
    fi

    $PACKAGE_MANAGER run build 
done
