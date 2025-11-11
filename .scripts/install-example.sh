#!/usr/bin/env bash

# Install dependencies for a single example using the given package manager
# Usage: ./install-example.sh <package_manager> <test_dir>
# Example: ./install-example.sh bun react-minimal

# Redirect all output to stdout
exec 2>&1

cd $(dirname $0)/..
ROOT=$(pwd)

PACKAGE_MANAGER="${1:?missing package manager}"
TEST_DIR="${2:?missing test dir}"
cd "$TEST_DIR"

echo "::group::Installing dependencies for ${TEST_DIR} using ${PACKAGE_MANAGER}"

finish() {
  status=$?
  if [ $status -ne 0 ]; then
    echo "::error title=Build failed::$TEST_DIR exited with status $status"
  fi
  echo "::endgroup::"
  exit $status
}
trap finish EXIT

case "$PACKAGE_MANAGER" in
  bun)
    bun install --prefer-offline
    ;;
  npm)
    npm install --prefer-offline --no-audit --no-fund
    ;;
  pnpm)
    pnpm install --prefer-offline
    ;;
  yarn)
    yarn install --prefer-offline --mutex file:/tmp/.yarn-mutex
    ;;
  *)
    echo "Error: Unknown package manager '$PACKAGE_MANAGER'"
    exit 1
    ;;
esac
