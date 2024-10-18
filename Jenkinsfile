pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-access-key')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Set up Terraform') {
            steps {
                // sh 'node --version'
                // sh 'ls -a'
                // // sh 'chmod -R 777 /var/'
                sh 'chmod 777 ./setup_script_tf.sh'
                // sh 'apt-get install sudo'
                sh "echo sending password"
                sh 'echo Y | ./setup_script_tf.sh'
            }
        }
        stage('Install node'){
            steps{
                sh 'chmod 777 ./setup_ansible.sh'
                sh './setup_ansible.sh'
            }
        }
        // stage('Terraform Apply') {
        //     steps{
        //         // sh 'terraform apply -auto-approve'
        //     }
        // }
    }
}
