output "private_key" {
  value     = tls_private_key.private_key.private_key_pem
  sensitive = true
}

output "instance_ip_addr" {
  value = aws_instance.app_server.public_ip
}

output "public_key" {
  value = aws_key_pair.generated_key.public_key
}

output "security-group-id"{
  value = aws_security_group.jenkins_security.id
}
