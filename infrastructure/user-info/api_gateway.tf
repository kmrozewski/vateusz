resource aws_api_gateway_rest_api proxy {
  name        = var.app_name
  description = "API gateway for user-data related lambda functions"
}

resource aws_api_gateway_domain_name proxy {
  domain_name     = local.api_domain
  certificate_arn = aws_acm_certificate.api_domain.arn
}

resource aws_api_gateway_resource proxy {
  rest_api_id = aws_api_gateway_rest_api.proxy.id
  parent_id   = aws_api_gateway_rest_api.proxy.root_resource_id
  path_part   = "{proxy+}"
}

resource aws_api_gateway_authorizer proxy {
  name          = "CognitoUserPoolAuthorizer"
  type          = "COGNITO_USER_POOLS"
  rest_api_id   = aws_api_gateway_resource.proxy.rest_api_id
  provider_arns = [var.cognito_user_pool_arn]
}

resource aws_api_gateway_method post {
  http_method   = "POST"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.proxy.id
  resource_id   = aws_api_gateway_resource.proxy.id
  rest_api_id   = aws_api_gateway_resource.proxy.rest_api_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource aws_api_gateway_integration proxy {
  rest_api_id             = aws_api_gateway_rest_api.proxy.id
  resource_id             = aws_api_gateway_resource.proxy.id
  http_method             = aws_api_gateway_method.post.http_method
  integration_http_method = aws_api_gateway_method.post.http_method
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.add_new_user_data.invoke_arn
}

resource aws_api_gateway_method_response post_response {
  for_each = toset(local.api_status_response)

  rest_api_id         = aws_api_gateway_rest_api.proxy.id
  http_method         = aws_api_gateway_method.post.http_method
  resource_id         = aws_api_gateway_resource.proxy.id
  status_code         = each.value
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Headers" = true
  }
}


resource aws_api_gateway_deployment proxy {
  rest_api_id = aws_api_gateway_rest_api.proxy.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.proxy.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource aws_api_gateway_stage proxy {
  deployment_id = aws_api_gateway_deployment.proxy.id
  rest_api_id   = aws_api_gateway_rest_api.proxy.id
  stage_name    = var.level
}

resource aws_api_gateway_method_settings proxy {
  rest_api_id = aws_api_gateway_rest_api.proxy.id
  stage_name  = aws_api_gateway_stage.proxy.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled        = false
    throttling_burst_limit = var.throttling_burst_limit
    throttling_rate_limit  = var.throttling_rate_limit
  }
}

resource aws_api_gateway_base_path_mapping proxy {
  api_id = aws_api_gateway_rest_api.proxy.id
  stage_name = aws_api_gateway_stage.proxy.stage_name
  domain_name = aws_api_gateway_domain_name.proxy.domain_name
}
