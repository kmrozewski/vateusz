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
  name               = "${var.function_name}-assume-api-gateway"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource aws_iam_role_policy_attachment lambda_basic_execution {
  role       = aws_iam_role.proxy.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource aws_iam_role_policy_attachment lambda_dynamodb_access {
  role       = aws_iam_role.proxy.name
  policy_arn = aws_iam_policy.dynamodb_access.arn
}

resource aws_iam_policy dynamodb_access {
  name        = "${var.function_name}-dynamodb-access"
  description = "DynamoDB access for ${var.function_name}"
  policy      = data.aws_iam_policy_document.dynamodb_allow_actions.json
}

data aws_iam_policy_document dynamodb_allow_actions {
  statement {
    effect    = "Allow"
    resources = [var.table_arn]
    actions   = var.table_actions
  }
}

resource aws_lambda_permission proxy {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.api_gateway_execution_arn}/*/*"
}
