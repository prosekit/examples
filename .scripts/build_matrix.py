#!/usr/bin/env python3

from typing import List
import json
import os


# Find all directories that contain a package.json file in the root directory
def find_directories() -> List[str]:
    # get the parent directory as root
    root = os.path.dirname(os.path.dirname(__file__))

    # find all directories that contain a package.json file
    dirs = []
    for dirpath, _, filenames in os.walk(root):
        if "node_modules" in dirpath:
            continue
        if "package.json" in filenames:
            dirs.append(dirpath)

    # return the relative paths
    return [os.path.relpath(d, root) for d in dirs]


# Split a list of items into m chunks
def chunk(items: List[str], m: int) -> List[List[str]]:
    n = len(items)
    size = (n // m) + (n % m > 0)
    chunks = [items[i * size : (i + 1) * size] for i in range(m)]
    return [c for c in chunks if len(c) > 0]


def main():
    package_managers = ["npm", "yarn", "pnpm", "bun"]
    all_dirs = find_directories()
    max_concurrent = 255
    chunks = chunk(all_dirs, max_concurrent // len(package_managers))

    matrix = {
        "package_manager": package_managers,
        "dir": [" ".join(dirs) for dirs in chunks],
    }

    # Dump the matrix to a JSON string, without any whitespace
    matrix_json = json.dumps(matrix, separators=(",", ":"))

    print(matrix_json)


if __name__ == "__main__":
    main()
