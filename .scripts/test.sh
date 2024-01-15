#!/usr/bin/env bash

set -e 

cd $(dirname $0)/..
ROOT=$(pwd)

# First argument is the package manager to use
PACKAGE_MANAGER="${1}"
echo "Using package manager $PACKAGE_MANAGER"

# Rest of the arguments are the directories to test
TEST_DIRS="${@:2}"

for TEST_DIR in $TEST_DIRS; do
    echo "Testing directory $TEST_DIR"
    cd "$ROOT"
    cd "$TEST_DIR"
    mkdir -p ./.temp
    rm -rf ./.temp
    mkdir -p ./.temp

    $PACKAGE_MANAGER install --prefer-offline
    $PACKAGE_MANAGER run build 
done
