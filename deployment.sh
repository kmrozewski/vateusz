#!/bin/sh
set -e

read -p "AWS Profile name: " PROFILE_NAME
if [ -z "$PROFILE_NAME" ]; then
  echo "Missing profile name."
  exit 1
fi


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
yarn install
while true; do
  read -p "Do you want to deploy to DEV or PROD (dev/prod) environment? " option

  case $option in
    [dD]* ) echo "Building dev..."
      yarn build:dev;
      break;;
    [pP]* ) echo "Building prod..."
      yarn build:prod;
      break;;
    * ) echo "Invalid response";;
  esac
done


# Deploy to S3

# Ask for permission to remove S3 bucket
echo "aws s3 rm s3://${APP_BUCKET}/ --recursive --profile $PROFILE_NAME"
while true; do
  read -p "Do you want to want to continue? (y/n) " yn

  case $yn in
    [yY] ) echo "Removing data in ${APP_BUCKET}"
      aws s3 rm s3://"${APP_BUCKET}"/ --recursive --profile "$PROFILE_NAME"
      echo ""
      echo "aws s3 cp ./build s3://${APP_BUCKET}/ --recursive --profile $PROFILE_NAME"
      aws s3 cp ./build s3://"${APP_BUCKET}"/ --recursive --profile "$PROFILE_NAME"
      break;;
    [nN] ) echo "Deployment failed"
      exit 1;
      break;;
  esac
done

# Ask for permission to invalidate Cloud Front distribution
echo "aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths '/*' --profile $PROFILE_NAME"
while true; do
  read -p "Do you want to continue (y/n) " yn

  case $yn in
    [yY] ) echo "Running invalidation"
      aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths '/*' --profile "$PROFILE_NAME"
      break;;
    [nN] ) echo "Deployment failed"
      exit 1;
      break;;
  esac
done

echo "Deployment finished successfully"