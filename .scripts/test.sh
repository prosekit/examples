#!/usr/bin/env bash

# Test multiple directories using the given package manager
# Usage: ./test.sh <package_manager> <test_dir1> <test_dir2> ...
# Example: ./test.sh bun react-minimal vue-minimal svelte-minimal

set -e 

cd $(dirname $0)/..
ROOT=$(pwd)

# First argument is the package manager to use
PACKAGE_MANAGER="${1}"
echo "Using package manager $PACKAGE_MANAGER"
$PACKAGE_MANAGER --version

# Rest of the arguments are the directories to test
TEST_DIRS=("${@:2}")

for dir in "${TEST_DIRS[@]}"; do
  .scripts/install-example.sh "$PACKAGE_MANAGER" "$dir"
  .scripts/build-example.sh "$PACKAGE_MANAGER" "$dir"
done
