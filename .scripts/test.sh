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

install_start=$SECONDS
for dir in "${TEST_DIRS[@]}"; do
  .scripts/install-example.sh "$PACKAGE_MANAGER" "$dir"
done
install_time=$((SECONDS - install_start))

build_start=$SECONDS
for dir in "${TEST_DIRS[@]}"; do
  .scripts/build-example.sh "$PACKAGE_MANAGER" "$dir"
done
build_time=$((SECONDS - build_start))

echo '================================'
echo "Install time: $install_time seconds"
echo "Build time: $build_time seconds"
echo '================================'
