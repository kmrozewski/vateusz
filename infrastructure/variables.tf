variable region {
  type = string
  description = "App region"
  default = "eu-west-1"
}

variable acm_region {
  type = string
  description = "ACM certificate region"
  default = "us-east-1"
}

variable app_name {
  type = string
  description = "Application name"
}

variable domain {
  type = string
  description = "Domain name"
}

variable level {
  type = string
  description = "Environment level e.g. dev/test/prod"
}
