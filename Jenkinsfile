pipeline {
    agent any 
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Terraform Init') {
            steps {
                sh 'ls -a'
                sh 'terraform init'
            }
        }
        stage('Terraform Apply') {
            steps {
                // sh 'terraform apply -auto-approve'
            }
        }
    }
}
