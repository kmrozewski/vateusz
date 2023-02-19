resource aws_acm_certificate api_domain {
  provider = aws.acm

  domain_name = local.api_domain
  validation_method = "DNS"
}

resource aws_acm_certificate_validation api_domain {
  provider = aws.acm

  certificate_arn = aws_acm_certificate.api_domain.arn
  validation_record_fqdns = [aws_route53_record.certificate.fqdn]

  timeouts {
    create = "45m"
  }
}
