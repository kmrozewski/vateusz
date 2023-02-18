data archive_file empty_file {
  type        = "zip"
  source_file = "${path.module}/dynamo_write_lambda.mjs"
  output_path = "${path.module}/empty_lambda.zip"
}

resource aws_lambda_function add_new_user_data {
  filename      = data.archive_file.empty_file.output_path
  function_name = "${var.app_name}-add-new-user-data"
  role          = aws_iam_role.proxy.arn
  runtime       = "nodejs18.x"
  architectures = ["arm64"]
  handler       = "dynamo_write_lambda.handler"

  environment {
    variables = {
      REGION = var.region
      TABLE_NAME = aws_dynamodb_table.user_data.name
    }
  }
}
