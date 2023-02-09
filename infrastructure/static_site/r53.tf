resource aws_route53_record primary {
  zone_id = var.hosted_zone_id
  type    = "A"
  name    = var.domain

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.primary.domain_name
    zone_id                = aws_cloudfront_distribution.primary.hosted_zone_id
  }
}

resource aws_route53_record certificate {
  zone_id         = var.hosted_zone_id
  allow_overwrite = true
  name            = aws_acm_certificate.primary.domain_validation_options.*.resource_record_name[0]
  records         = [aws_acm_certificate.primary.domain_validation_options.*.resource_record_value[0]]
  type            = aws_acm_certificate.primary.domain_validation_options.*.resource_record_type[0]
  ttl             = 300
}
