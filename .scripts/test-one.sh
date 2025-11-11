#!/usr/bin/env bash

# Test a single directory using the given package manager
# Usage: ./test-one.sh <package_manager> <test_dir>
# Example: ./test-one.sh bun vue-unmount

set -e 
cd $(dirname $0)/..
ROOT=$(pwd)

PACKAGE_MANAGER="${1:?missing package manager}"
TEST_DIR="${2:?missing test dir}"

echo "========================================================"
echo "Testing directory $TEST_DIR"
echo "--------------------------------------------------------"
cd "$TEST_DIR"
echo "========================================================"
echo "Installing dependencies using $PACKAGE_MANAGER"
echo "--------------------------------------------------------"
$PACKAGE_MANAGER install --prefer-offline
echo "========================================================"
echo "Building $TEST_DIR"
echo "--------------------------------------------------------"
$PACKAGE_MANAGER run build
echo "========================================================"
