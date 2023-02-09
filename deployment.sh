#!/bin/sh
set -e

# Clean up
rm -rf node_modules
rm -rf build

npm install
npm run build

# Deploy to S3
aws s3 rm s3://"${APP_BUCKET}"/ --recursive --profile "$PROFILE_NAME"
aws s3 cp ./build s3://"${APP_BUCKET}"/ --recursive --profile "$PROFILE_NAME"

# Invalidate Cloud Front distribution
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths '/*' --profile "$PROFILE_NAME"
