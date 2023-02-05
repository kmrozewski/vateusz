
variable "profile" {
  type = string
  description = "AWS profile name stored in ~/.aws/config"
  default = "personal"
}

variable "region" {
  type = string
  description = "App region"
  default = "eu-west-1"
}

variable "site_bucket_name" {
  description = "Bucket name for static website hosting"
  type = string
}
