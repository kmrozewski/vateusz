resource aws_cognito_identity_pool identity {
  identity_pool_name = var.app_name
  allow_classic_flow = true
  allow_unauthenticated_identities = false

  cognito_identity_providers {
    client_id = aws_cognito_user_pool_client.pool.id
    provider_name = "cognito-idp.${var.region}.amazonaws.com/${aws_cognito_user_pool.pool.id}"
    server_side_token_check = false
  }
}

resource aws_cognito_identity_pool_roles_attachment identity {
  identity_pool_id = aws_cognito_identity_pool.identity.id

  roles = {
    "authenticated": aws_iam_role.authenticated.arn
  }
}
