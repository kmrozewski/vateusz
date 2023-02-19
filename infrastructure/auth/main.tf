locals {
  suffix         = "-files"
  origin         = "https://${var.domain}${local.suffix}/"
  sub_origin     = "https://${var.level}.${var.domain}${local.suffix}/"
  bucket_arn     = "arn:aws:s3:::${var.app_name}${local.suffix}"
  sub_bucket_arn = "arn:aws:s3:::${var.level}-${var.app_name}${local.suffix}"

  bucket_resources = [
    local.bucket_arn,
    "${local.bucket_arn}/protected/*",
    "${local.bucket_arn}/private/*",
    local.sub_bucket_arn,
    "${local.sub_bucket_arn}/protected/*",
    "${local.sub_bucket_arn}/private/*"
  ]
}
