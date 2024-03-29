variable app_name {
  type        = string
  description = "Application name"
}

variable domain {
  type        = string
  description = "Domain name"
}

variable sub_domain {
  type        = string
  description = "Sub-domain name, e.g. dev.example.com"
}

variable region {
  type        = string
  description = "App region"
  default     = "eu-west-1"
}

variable level {
  type        = string
  description = "Environment level e.g. dev/test/prod"
}

variable cognito_user_pool_arn {
  type        = string
  description = "Cognito user pool ARN"
}

variable zone_id {
  type        = string
  description = "Route53 zone id"
}

variable certificate_arn {
  type    = string
  default = "ACM certificate ARN"
}

variable throttling_burst_limit {
  type        = number
  description = "Throttling burst limit, set -1 to disable throttling"
  default     = 100
}

variable throttling_rate_limit {
  type        = number
  description = "Throttling rate limit, set -1 to disable throttling"
  default     = 100
}

variable is_localhost_available {
  type        = bool
  description = "Flag add http://localhost:3000 to CORS"
}
