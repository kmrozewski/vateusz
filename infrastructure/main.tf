terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  cloud {
    organization = "konradmrozewski"
    workspaces {
      name = "vateusz"
    }
  }

  required_version = ">= 1.3.7"
}

provider aws {
  region  = var.region
}

provider aws {
  alias   = "acm"
  region  = var.acm_region
}

module static_site {
  source = "./static_site"

  app_name = var.app_name
  domain   = var.domain

  region = var.region
  level  = var.level

  hosted_zone_id         = aws_route53_zone.main.id
  is_localhost_available = false

  providers = {
    aws     = aws
    aws.acm = aws.acm
  }
}

module dev_static_site {
  source = "./static_site"

  app_name = "${var.level}-${var.app_name}"
  domain   = "${var.level}.${var.domain}"

  region = var.region
  level  = var.level

  hosted_zone_id         = aws_route53_zone.main.id
  is_localhost_available = true

  providers = {
    aws     = aws
    aws.acm = aws.acm
  }
}

module auth {
  source     = "./auth"
  depends_on = [module.static_site]

  app_name   = var.app_name
  domain     = var.domain
  sub_domain = "${var.level}.${var.domain}"
  level      = var.level
}

module user_info {
  source     = "./user-info"
  depends_on = [module.auth]

  app_name   = var.app_name
  domain     = var.domain
  sub_domain = "${var.level}.${var.domain}"
  level      = var.level

  zone_id                = aws_route53_zone.main.zone_id
  cognito_user_pool_arn  = module.auth.cognito_user_pool_arn
  is_localhost_available = true

  providers = {
    aws     = aws
    aws.acm = aws.acm
  }
}
