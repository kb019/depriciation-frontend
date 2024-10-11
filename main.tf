terraform {
  cloud { 
    organization = "terraform_cloud_state" 
    workspaces { 
      name = "jenkins_setup_workspace" 
    } 
  } 

}

provider "aws" {
  region  = "us-west-2"
}

resource "aws_instance" "app_server" {
  ami           = "ami-04dd23e62ed049936"
  instance_type = "t2.micro"

  tags = {
    Name = "JenkinsSeverSetup"
  }
}