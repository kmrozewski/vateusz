resource aws_cloudfront_distribution primary {
  enabled         = true
  is_ipv6_enabled = true
  aliases         = [var.domain]

  origin {
    connection_attempts = 3
    connection_timeout  = 10
    domain_name         = local.s3_domain
    origin_id           = local.s3_domain

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy = "http-only"
      origin_read_timeout    = 30
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    cache_policy_id        = aws_cloudfront_cache_policy.primary.id
    target_origin_id       = local.s3_domain
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate.primary.arn
    cloudfront_default_certificate = false
    minimum_protocol_version       = "TLSv1.2_2021"
    ssl_support_method             = "sni-only"
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }
}

resource aws_cloudfront_cache_policy primary {
  name = "Managed-CachingOptimized"
  comment = "Default policy when CF compression is enabled"
  min_ttl = 1

  parameters_in_cache_key_and_forwarded_to_origin {
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true

    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}
