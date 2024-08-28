#!/usr/bin/env bash

set -ex 

cd $(dirname $0)/..

if [ ! -d ./.temp/prosekit ]; then
  git clone --depth 1 https://github.com/ocavue/prosekit --branch master ./.temp/prosekit
fi
