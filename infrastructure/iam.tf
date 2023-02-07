resource aws_iam_role s3_read {
  name                = "${var.app_name}-cognito-user-pool-admin-group"
  assume_role_policy  = data.aws_iam_policy_document.assume_role.json
  managed_policy_arns = [aws_iam_policy.s3_read.arn]
}

data aws_iam_policy_document assume_role {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Federated"
      identifiers = ["cognito-identity.amazonaws.com"]
    }
  }
}

data aws_iam_policy_document assume_federated_identity {
  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "StringEquals"
      variable = "cognito-identity.amazonaws.com:aud"
      values   = ["eu-west-1:33317ecd-cb98-45b8-bcd1-4539495fb098"]
    }

    condition {
      test     = "ForAnyValue:StringLike"
      variable = "cognito-identity.amazonaws.com:amr"
      values   = ["authenticated"]
    }

    principals {
      type        = "Federated"
      identifiers = ["cognito-identity.amazonaws.com"]
    }
  }
}

resource aws_iam_policy s3_read {
  name        = "${var.app_name}-files-s3-read"
  description = "Read access S3 access for all cognito user protected directories"
  policy      = data.aws_iam_policy_document.s3_read.json
}

data aws_iam_policy_document s3_read {
  statement {
    effect = "Allow"

    resources = [
      aws_s3_bucket.user_files.arn,
      "${aws_s3_bucket.user_files.arn}/protected/*",
      "${aws_s3_bucket.user_files.arn}/private/*",
    ]

    actions = [
      "s3:GetObjectAcl",
      "s3:GetObject",
      "s3:ListBucketMultipartUploads",
      "s3:GetObjectRetention",
      "s3:ListBucket",
      "s3:GetBucketAcl",
      "s3:ListMultipartUploadParts"
    ]
  }
}

resource aws_iam_role s3_read_write {
  name                = "${var.app_name}-cognito-user-pool-user-group"
  assume_role_policy  = data.aws_iam_policy_document.assume_role.json
  managed_policy_arns = [aws_iam_policy.s3_read_write.arn]
}

resource aws_iam_policy s3_read_write {
  name        = "${var.app_name}-files-s3-read-write"
  description = "Read/Write S3 access for single cognito user private/protected directory"
  policy      = data.aws_iam_policy_document.s3_read_write.json
}

data aws_iam_policy_document s3_read_write {
  statement {
    effect = "Allow"

    resources = [
      aws_s3_bucket.user_files.arn,
      "${aws_s3_bucket.user_files.arn}/private/$${cognito-identity.amazonaws.com:sub}/*",
      "${aws_s3_bucket.user_files.arn}/protected/$${cognito-identity.amazonaws.com:sub}/*",
    ]

    actions = [
      "s3:PutObject",
      "s3:GetObjectAcl",
      "s3:GetObject",
      "s3:ListBucketMultipartUploads",
      "s3:GetObjectRetention",
      "s3:PutObjectRetention",
      "s3:ListBucket",
      "s3:DeleteObject",
      "s3:GetBucketAcl",
      "s3:ListMultipartUploadParts"
    ]
  }
}

resource aws_iam_role authenticated {
  name                = "${var.app_name}-cognito-idp-authenticated"
  assume_role_policy  = data.aws_iam_policy_document.assume_federated_identity.json
  managed_policy_arns = [aws_iam_policy.authenticated.arn, aws_iam_policy.s3_read_write.arn]
}

resource aws_iam_policy authenticated {
  name        = "${var.app_name}-cognito-authenticated"
  description = "Authenticated role for Cognito IDP"
  policy      = data.aws_iam_policy_document.authenticated.json
}

data aws_iam_policy_document authenticated {
  statement {
    effect = "Allow"

    resources = ["*"]

    actions = [
      "cognito-identity:*",
      "mobileanalytics:PutEvents",
      "cognito-sync:*"
    ]
  }
}
