terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.3.7"
}

provider aws {
  region  = var.region
  profile = var.profile
}



locals {
  origin = var.domain
  s3_domain = "${var.app_name}.s3-website-${var.region}.amazonaws.com"
}

module static_site {
  source = "./static_site"

  app_name = var.app_name
  domain = var.domain
  profile = var.profile

  region = var.region
  acm_region = var.acm_region
  level = var.level

  hosted_zone_id = aws_route53_zone.main.id
  is_localhost_available = false
}

module dev_static_site {
  source = "./static_site"

  app_name = "${var.level}-${var.app_name}"
  domain = "${var.level}.${var.domain}"
  profile = var.profile

  region = var.region
  acm_region = var.acm_region
  level = var.level

  hosted_zone_id = aws_route53_zone.main.id
  is_localhost_available = true
}

module auth {
  source = "./auth"
  depends_on = [module.static_site]

  app_name = var.app_name
  domain = var.domain
  sub_domain = "${var.level}.${var.domain}"
  level = var.level
}
