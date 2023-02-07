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

provider aws {
  alias  = "acm_provider"
  region = var.acm_region
  profile = var.profile
}

locals {
  origin = "https://${var.domain}"
  sub_origin = "https://${var.level}.${var.domain}"
  s3_domain = "${var.app_name}.s3-website-${var.region}.amazonaws.com"
}
