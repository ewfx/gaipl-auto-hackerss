#!/bin/bash

# Read the file name from the first argument
FILE=$1

# Check if the file exists
if [[ -f "$FILE" ]]; then
  cat "$FILE"
else
  echo "File not found: $FILE"
  exit 1
fi