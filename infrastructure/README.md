# Infrastructure
Use the `terraform.tfvars.example` as a guide to create your own terraform variables. You are free to create additional S3 bucket to host the `terraform.tfstate` file or use [terraform cloud](https://developer.hashicorp.com/terraform/tutorials/cloud/cloud-migrate). 

## Available scripts
### Plan
In order to create execution plan, use:
```bash
terraform plan
```

### Execute
To apply calculated execution plan, use:
```bash
terraform apply
```

### Destroy
Removes all remote objects managed by Terraform.
```bash
terraform destroy
```
