terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"

}

provider "aws" {
  region  = "us-east-2"
}

resource "aws_security_group"  "jenkins_security"{
  name="jenkins-user-security-group"
  description ="This is the security group for jenkins user"
  vpc_id="vpc-00e154fa6fec6eb81"
  tags={
    Name="security-group"
  }
  ###
  ###
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ingress {
  #   from_port   = -1
  #   to_port     = -1
  #   protocol    = "icmp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  #  ingress {
  #   from_port   = 5173
  #   to_port     = 5173
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }
  egress{
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
} 

resource "aws_instance" "app_server" {
  ami           = "ami-04dd23e62ed049936"
  instance_type = "t2.micro"
  key_name = "jenkins_aws_key_pair"
  vpc_security_group_ids = [aws_security_group.jenkins_security.id]

  tags = {
    Name = "JenkinsSeverSetup"
  }
}

output "instance_ip_addr" {
  value = aws_instance.app_server.private_ip
}

