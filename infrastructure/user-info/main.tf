locals {
  api_status_response = ["200", "500"]
  api_domain          = "api.${var.domain}"
  origin              = "https://${var.domain}"
  sub_origin          = "https://${var.sub_domain}"
  allow_origin        = join(",", flatten([local.origin, local.sub_origin, var.is_localhost_available ? ["http://localhost:3000/"] : []]))
  allow_headers       = ["Content-Type", "Authorization"]
}

module "cors" {
  source  = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.3"

  api_id          = aws_api_gateway_rest_api.proxy.id
  api_resource_id = aws_api_gateway_resource.proxy.id
}

module post_user_info {
  source = "./lambda_integration"
  region = var.region

  rest_api_id               = aws_api_gateway_rest_api.proxy.id
  resource_id               = aws_api_gateway_resource.proxy.id
  authorizer_id             = aws_api_gateway_authorizer.proxy.id
  api_gateway_execution_arn = aws_api_gateway_rest_api.proxy.execution_arn

  function_name = "${var.app_name}-add-new-user-data"
  function_path = "${path.module}/dynamo_write_lambda"
  output_path   = "${path.module}/post"
  allow_origin  = local.allow_origin
  allow_headers = local.allow_headers
  allow_methods = ["POST", "OPTIONS"]

  table_arn     = aws_dynamodb_table.user_data.arn
  table_name    = aws_dynamodb_table.user_data.name
  table_actions = [
    "dynamodb:PutItem",
    "dynamodb:UpdateItem"
  ]
}

module get_user_info {
  source = "./lambda_integration"
  region = var.region

  rest_api_id               = aws_api_gateway_rest_api.proxy.id
  resource_id               = aws_api_gateway_resource.proxy.id
  authorizer_id             = aws_api_gateway_authorizer.proxy.id
  api_gateway_execution_arn = aws_api_gateway_rest_api.proxy.execution_arn

  function_name = "${var.app_name}-get-new-user-data"
  function_path = "${path.module}/dynamo_read_lambda"
  output_path   = "${path.module}/get"
  allow_origin  = local.allow_origin
  allow_headers = local.allow_headers
  allow_methods = ["GET", "OPTIONS"]

  table_arn     = aws_dynamodb_table.user_data.arn
  table_name    = aws_dynamodb_table.user_data.name
  table_actions = ["dynamodb:Scan"]
}
