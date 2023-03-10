resource aws_api_gateway_method proxy {
  http_method   = var.integration_method
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = var.authorizer_id
  resource_id   = var.resource_id
  rest_api_id   = var.rest_api_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource aws_api_gateway_integration proxy {
  rest_api_id             = var.rest_api_id
  resource_id             = var.resource_id
  http_method             = aws_api_gateway_method.proxy.http_method
  integration_http_method = aws_api_gateway_method.proxy.http_method
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.proxy.invoke_arn
}

resource aws_api_gateway_method_response post_response {
  for_each = toset(local.api_status_response)

  rest_api_id         = var.rest_api_id
  http_method         = aws_api_gateway_method.proxy.http_method
  resource_id         = var.resource_id
  status_code         = each.value
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Headers" = true
  }
}
