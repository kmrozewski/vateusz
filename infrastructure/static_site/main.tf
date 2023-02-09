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
  alias  = "acm_provider"
  region = var.acm_region
  profile = var.profile
}

locals {
  origin = "https://${var.domain}"
  allowed_origins = flatten([local.origin, var.is_localhost_available ? ["http://localhost:3000"] : []])
  s3_domain = "${var.app_name}.s3-website-${var.region}.amazonaws.com"
}
