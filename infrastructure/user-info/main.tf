locals {
  api_status_response = ["200", "500"]
  api_domain          = "api.${var.domain}"
  origin              = "https://${var.domain}"
  sub_origin          = "https://${var.sub_domain}"
  allow_origin        = join(",", flatten([local.origin, local.sub_origin, var.is_localhost_available ? ["http://localhost:3000/"] : []]))
  allow_headers       = ["Content-Type", "Authorization"]
  allow_methods        = ["POST", "OPTIONS"]
}
