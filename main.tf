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

resource "tls_private_key" "private_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = "aws-jenkins-key-pair"
  public_key = tls_private_key.private_key.public_key_openssh
}

resource "aws_security_group"  "jenkins_security"{
  name="jenkins-aws-user-security-group"
  description ="This is the security group for jenkins user"
  vpc_id="vpc-0a59cf3cf7d43f653"
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

 ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress{
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
} 

resource "aws_instance" "app_server" {
  ami           = "ami-0ea3c35c5c3284d82"
  instance_type = "t2.micro"
  key_name = aws_key_pair.generated_key.key_name
  vpc_security_group_ids = [aws_security_group.jenkins_security.id]

  tags = {
    Name = "JenkinsSeverSetup"
  }
}



