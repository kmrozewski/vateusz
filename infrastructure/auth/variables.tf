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
