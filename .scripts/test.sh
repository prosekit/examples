#!/usr/bin/env bash

# Test multiple directories using the given package manager
# Usage: ./test.sh <package_manager> <test_dir1> <test_dir2> ...
# Example: ./test.sh bun vue-unmount vue-router

set -e 

cd $(dirname $0)/..
ROOT=$(pwd)

# First argument is the package manager to use
PACKAGE_MANAGER="${1}"
echo "Using package manager $PACKAGE_MANAGER"
$PACKAGE_MANAGER --version

# Rest of the arguments are the directories to test
TEST_DIRS=("${@:2}")

# Test each directory in parallel using 4 jobs
# If any test fails, the script will exit immediately
parallel --halt soon,fail=1 -j4 \
    bash ".scripts/test-one.sh" "$PACKAGE_MANAGER" {1} ::: "${TEST_DIRS[@]}"
