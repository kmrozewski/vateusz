data archive_file empty_file {
  type        = "zip"
  source_file = "${var.function_path}.mjs"
  output_path = "${var.output_path}.zip"
}

resource aws_lambda_function proxy {
  filename      = data.archive_file.empty_file.output_path
  function_name = var.function_name
  role          = aws_iam_role.proxy.arn
  runtime       = "nodejs18.x"
  architectures = ["arm64"]
  handler       = "${var.function_path}.handler"

  environment {
    variables = {
      REGION        = var.region
      TABLE_NAME    = var.table_name
      ALLOW_ORIGIN  = var.allow_origin
      ALLOW_HEADERS = join(",", var.allow_headers)
      ALLOW_METHODS = join(",", var.allow_methods)
    }
  }
}
