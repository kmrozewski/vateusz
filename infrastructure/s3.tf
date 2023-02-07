resource aws_s3_bucket site_contents {
  bucket = var.app_name
}

resource aws_s3_bucket_policy site_contents {
  bucket = aws_s3_bucket.site_contents.id
  policy = data.aws_iam_policy_document.site_contents.json
}

resource aws_s3_bucket_acl site_contents {
  bucket = aws_s3_bucket.site_contents.id
}

data aws_iam_policy_document site_contents {
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

resource aws_s3_bucket_website_configuration site_contents {
  bucket = aws_s3_bucket.site_contents.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource aws_s3_bucket_cors_configuration site_contents {
  bucket = aws_s3_bucket.site_contents.id

  cors_rule {
    allowed_headers = ["*"] // TODO: improve it
    allowed_methods = ["GET", "POST", "HEAD"]
    allowed_origins = [local.origin]
    max_age_seconds = 3600
  }
}

resource aws_s3_bucket user_files {
  bucket = "${var.app_name}-files"
}

resource aws_s3_bucket_public_access_block user_files {
  bucket = aws_s3_bucket.user_files.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource aws_s3_bucket_cors_configuration user_files {
  bucket = aws_s3_bucket.user_files.id

  cors_rule {
    allowed_headers = ["*"] // TODO: improve it
    allowed_methods = ["GET", "POST", "PUT", "DELETE"]
    allowed_origins = [local.origin]
    max_age_seconds = 3600
  }
}

resource aws_s3_bucket_server_side_encryption_configuration user_files {
  bucket = aws_s3_bucket.user_files.id

  rule {
    bucket_key_enabled = false

    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource aws_s3_bucket_acl user_files {
  bucket = aws_s3_bucket.user_files.id
}
