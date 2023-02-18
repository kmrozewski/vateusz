data archive_file empty_file {
  type        = "zip"
  output_path = "${path.module}/empty_lambda.zip"
  source {
    content  = "export const handler = async (event) => ({statusCode: 200, body: 'Empty lambda'});"
    filename = "index.mjs"
  }
}

resource aws_lambda_function add_new_user_data {
  filename      = data.archive_file.empty_file.output_path
  function_name = "${var.app_name}-add-new-user-data"
  role          = aws_iam_role.proxy.arn
  runtime       = "nodejs18.x"
  architectures = ["arm64"]
  handler       = "index.handler"
}
