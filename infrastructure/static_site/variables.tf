variable app_name {
  type        = string
  description = "Application name"
}

variable domain {
  type        = string
  description = "Domain name"
}

variable profile {
  type        = string
  description = "AWS profile name stored in ~/.aws/config"
  default     = "personal"
}

variable region {
  type        = string
  description = "App region"
  default     = "eu-west-1"
}

variable hosted_zone_id {
  type        = string
  description = "Route53 hosted zone id"
}

variable is_localhost_available {
  type        = bool
  description = "Flag add http://localhost:3000 to CORS"
}

variable level {
  type        = string
  description = "Environment level e.g. dev/test/prod"
}
