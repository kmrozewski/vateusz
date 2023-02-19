locals {
  origin = "https://${var.domain}"
  allowed_origins = flatten([local.origin, var.is_localhost_available ? ["http://localhost:3000"] : []])
  s3_domain = "${var.app_name}.s3-website-${var.region}.amazonaws.com"
}
