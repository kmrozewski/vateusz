resource aws_acm_certificate primary {
  provider = aws.acm_provider
  domain_name = var.domain
  validation_method = "DNS"
}
