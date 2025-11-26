#!/usr/bin/env bash

# Build a single directory using the given package manager
# Usage: ./build-example.sh <package_manager> <test_dir>
# Example: ./build-example.sh bun react-minimal

# Redirect all output to stdout
exec 2>&1

cd $(dirname $0)/..
ROOT=$(pwd)

PACKAGE_MANAGER="${1:?missing package manager}"
TEST_DIR="${2:?missing test dir}"
cd "$TEST_DIR"

echo "::group::Building ${TEST_DIR} using ${PACKAGE_MANAGER}"

finish() {
  status=$?
  echo "::endgroup::"
  if [ $status -ne 0 ]; then
    echo "::error title=Build failed::Failed to build $TEST_DIR using $PACKAGE_MANAGER and exited with status $status"
  fi
  exit $status
}
trap finish EXIT

$PACKAGE_MANAGER run build  
