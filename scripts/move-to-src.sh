#!/bin/bash

# Create src directory if it doesn't exist
mkdir -p src

# Move directories to src
directories=(
    "pages"
    "components"
    "context"
    "hooks"
    "layout"
    "styles"
    "utils"
    "constants"
    "actor"
    "candid"
)

for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo "Moving $dir to src/"
        mv "$dir" "src/" 2>/dev/null || echo "Failed to move $dir"
    else
        echo "Directory $dir not found"
    fi
done

# Create necessary directories if they don't exist
mkdir -p src/assets
mkdir -p src/types

echo "File migration completed!"
