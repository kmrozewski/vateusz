resource aws_route53_record api_domain {
  name = local.api_domain
  type = "A"
  zone_id = var.zone_id

  alias {
    name = aws_api_gateway_domain_name.proxy.cloudfront_domain_name
    zone_id = aws_api_gateway_domain_name.proxy.cloudfront_zone_id
    evaluate_target_health = false
  }
}

resource aws_route53_record certificate {
  zone_id         = var.zone_id
  allow_overwrite = true
  name            = aws_acm_certificate.api_domain.domain_validation_options.*.resource_record_name[0]
  records         = [aws_acm_certificate.api_domain.domain_validation_options.*.resource_record_value[0]]
  type            = aws_acm_certificate.api_domain.domain_validation_options.*.resource_record_type[0]
  ttl             = 300
}

