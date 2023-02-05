terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.3.7"
}

provider "aws" {
  region = var.region
  profile = var.profile
}

resource "aws_s3_bucket" "site_contents" {
  bucket = var.site_bucket_name
}

resource "aws_s3_bucket_policy" "allow_public_access" {
  bucket = aws_s3_bucket.site_contents.id
  policy = data.aws_iam_policy_document.allow_public_access.json
}

data "aws_iam_policy_document" "allow_public_access" {
  statement {
    effect    = "Allow"
    resources = ["arn:aws:s3:::${aws_s3_bucket.site_contents.bucket}/*"]
    actions   = ["s3:GetObject"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_acl" "site_contents_acl" {
  bucket = aws_s3_bucket.site_contents.id
  acl = "private"
}
