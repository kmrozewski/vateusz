module "cors" {
  source  = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.3"

  api_id          = aws_api_gateway_rest_api.proxy.id
  api_resource_id = aws_api_gateway_resource.proxy.id

  allow_headers = local.allow_headers
  allow_origin  = local.allow_origin
  allow_methods = local.allow_methods
}


