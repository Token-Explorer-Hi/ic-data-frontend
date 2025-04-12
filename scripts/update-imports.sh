#!/bin/bash

# Update router imports
find src -type f -name "*.tsx" -exec sed -i '' 's/from "next\/router"/from "@\/hooks\/useCustomRouter"/g' {} +

# Update link imports
find src -type f -name "*.tsx" -exec sed -i '' 's/from "next\/link"/from "@\/components\/Link\/Link"/g' {} +

echo "Import statements updated!"
