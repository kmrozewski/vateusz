#!/bin/sh
set -e

#TODO: read $PROFILE_NAME with default as "personal"

# Read args
read -p "Static website S3 bucket: " APP_BUCKET
if [ -z "$APP_BUCKET" ]; then
  echo "Missing S3 bucket argument."
  exit 1
fi

read -p "Cloudfront DISTRIBUTION_ID: " DISTRIBUTION_ID
if [ -z "$DISTRIBUTION_ID" ]; then
  echo "Missing DISTRIBUTION_ID argument."
  exit 1
fi


# Clean up
while true; do
  read -p "Do you want to clean up node_modules? (y/n) " yn

  case $yn in
    [yY] ) echo "Cleaning up node_modules..."
      rm -rf node_modules;
      break;;
    [nN] ) echo "Clean up node_modules SKIPPED"
      break;;
    * ) echo "Invalid response";;
  esac
done
rm -rf build


# Install & build
npm install
while true; do
  read -p "Do you want to deploy ONLY to development environment? (y/n) " yn

  case $yn in
    [yY] ) echo "Building dev..."
      npm run build:dev;
      break;;
    [nN] ) echo "Building prod..."
      npm run build;
      break;;
    * ) echo "Invalid response";;
  esac
done


# Deploy to S3
echo "aws s3 rm s3://${APP_BUCKET}/ --recursive --profile $PROFILE_NAME"
aws s3 rm s3://"${APP_BUCKET}"/ --recursive --profile "$PROFILE_NAME"
echo "aws s3 cp ./build s3://${APP_BUCKET}/ --recursive --profile $PROFILE_NAME"
aws s3 cp ./build s3://"${APP_BUCKET}"/ --recursive --profile "$PROFILE_NAME"

# Invalidate Cloud Front distribution
echo "aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths '/*' --profile $PROFILE_NAME"
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths '/*' --profile "$PROFILE_NAME"
