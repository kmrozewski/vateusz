variable region {}
variable authorizer_id {}
variable rest_api_id {}
variable resource_id {}
variable function_name {}
variable function_path {
  type = string
  description = "Path to the file with the lambda function"
}
variable output_path {
  type = string
  description = "Output path for the lambda .zip file"
}
variable allow_origin {
  type = string
}
variable allow_headers {
  type = list(string)
}
variable allow_methods {
  type = list(string)
}
variable table_name {
  type = string
  description = "DynamoDB table name"
}
variable table_arn {
  type = string
  description = "DynamoDB table ARN"
}
variable table_actions {
  type = list(string)
  description = "IAM policy to allow actions in DynamoDB table"
}
variable api_gateway_execution_arn {
  type = string
  description = "API Gateway Rest API execution ARN"
}
