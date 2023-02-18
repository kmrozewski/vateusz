resource aws_cognito_user_pool pool {
  name = var.app_name

  username_attributes = ["email"]

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  auto_verified_attributes = ["email"]

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  username_configuration {
    case_sensitive = false
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true
    string_attribute_constraints {
      min_length = "0"
      max_length = "2048"
    }
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "name"
    required                 = true
    string_attribute_constraints {
      min_length = "0"
      max_length = "2048"
    }
  }

  user_attribute_update_settings {
    attributes_require_verification_before_update = ["email"]
  }
}

resource aws_cognito_user_pool_client pool {
  name                                 = var.app_name
  user_pool_id                         = aws_cognito_user_pool.pool.id
  access_token_validity                = 60
  id_token_validity                    = 60
  callback_urls                        = [local.origin, local.sub_origin]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = [
    "aws.cognito.signin.user.admin",
    "email",
    "openid",
    "profile"
  ]
  explicit_auth_flows = [
    "ALLOW_CUSTOM_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]
  read_attributes = [
    "email",
    "email_verified",
    "name",
  ]
  supported_identity_providers = ["COGNITO"]
  write_attributes             = ["email", "name"]
  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }
}

resource aws_cognito_user_group user_group {
  name         = "user"
  user_pool_id = aws_cognito_user_pool.pool.id
  precedence   = 2
  role_arn     = aws_iam_role.s3_read_write.arn
}

resource aws_cognito_user_group admin_group {
  name         = "admin"
  description  = "Administrator group"
  user_pool_id = aws_cognito_user_pool.pool.id
  precedence   = 1
  role_arn     = aws_iam_role.s3_read.arn
}


