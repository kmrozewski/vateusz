resource aws_route53_zone main {
  name          = var.domain
  force_destroy = false
}

resource aws_route53_record primary {
  zone_id = aws_route53_zone.main.id
  type    = "A"
  name    = var.domain

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.primary.domain_name
    zone_id                = aws_cloudfront_distribution.primary.hosted_zone_id
  }
}

resource aws_route53_record certificate {
  for_each = {
    for dvo in aws_acm_certificate.primary.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id         = aws_route53_zone.main.id
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type
  ttl             = 300
}
