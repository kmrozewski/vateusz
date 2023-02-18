data aws_iam_policy_document assume_role {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource aws_iam_role proxy {
  name               = "${var.app_name}-api-gateway"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource aws_iam_role_policy_attachment lambda_basic_execution {
  role       = aws_iam_role.proxy.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource aws_lambda_permission add_new_user_data {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.add_new_user_data.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.proxy.execution_arn}/*/${aws_api_gateway_method.post.http_method}${aws_api_gateway_resource.proxy.path}"
}
