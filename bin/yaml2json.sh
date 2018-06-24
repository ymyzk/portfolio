#!/bin/bash
set -e

cd $(dirname $0)
for file in ../src/data/*.yml; do
  jsonfile="${file%.yml}.json"
  echo "$file => $jsonfile"
  js-yaml "$file" > "$jsonfile"
done
