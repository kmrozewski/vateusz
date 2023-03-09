resource aws_acm_certificate primary {
  provider = aws.acm
  domain_name = var.domain
  validation_method = "DNS"
}
