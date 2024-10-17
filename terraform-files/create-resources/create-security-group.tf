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