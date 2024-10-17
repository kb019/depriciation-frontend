#!/bin/sh


echo "Hurray, Inside Bash script file";

# terraform init
cd ~/

isTerraformInstalled="false"
terraformPackage=$(apt list --installed | grep -i "terraform");

isAnsibleInstalled="false"
ansiblePackage=$(apt list --installed | grep -i "ansible");


echo "$terraformPackage"
echo "$ansiblePackage"

if [ -n "$terraformPackage" ]; then
    isTerraformInstalled="true";
    echo "terraform is installed";
fi

if [ "$isTerraformInstalled" = "false" ]; then
        echo "installing Terraform"
        sudo snap remove curl
        sudo apt install curl
        sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
        # sudo curl -fsSLo /usr/share/keyrings/hashicorp-archive-keyring.gpg https://apt.releases.hashicorp.com/gpg
        # echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
        #       https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
        #       sudo tee /etc/apt/sources.list.d/hashicorp.list
        # gpg --no-default-keyring \
        #     --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
        #     --fingerprint
        # sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com buster main"
        curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --yes --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list > /dev/null
        sudo apt update
        sudo apt-get install terraform
fi

if [ "$ansiblePackage" = "false" ]; then 
        echo "installing ansible"
        sudo apt install software-properties-common
        sudo add-apt-repository --yes --update ppa:ansible/ansible
        sudo apt-get install ansible
        echo "before ansible verison"
        ansible --version
        echo "after ansible version"
fi

cd /var/jenkins_home/workspace
cd depreciation_pipeline_frontend


terraform init -input=false
echo "terraform apply"
terraform apply -input=false -auto-approve
key=$(terraform output -raw private_key) 
keyPairId=$(terraform output -raw key_pair_id)
ec2InstanceIp=$(terraform output -raw instance_ip_addr);

runSshCopyId="true"

if [ -n "$keyPairId" ]; then
  echo "$key" > jenkins-key-pair.pem
  runSshCopyId="false"
fi

if [ -n "$ec2InstanceIp" ]; then
   echo "ubuntu@$ec2InstanceIp" > inventory.ini
fi


echo "$keyPairId"
echo "$ec2InstanceIp"
echo "ubuntu@$ec2InstanceIp"

cat inventory.ini
cat jenkins-key-pair.pem

echo -e "\n"
isSshPresent="false"
sshFolder=$(ls -a | grep -i ".ssh");

ls -a 

if [ -n "$sshFolder" ]; then 
   isSshPresent="true"
fi

echo "$isSshPresent"
echo "$sshFolder"
if [ "$isSshPresent" = "false" ]; then
   echo "setting up ssh keys"
   mkdir .ssh
   echo "y" | ssh-keygen -q -t rsa -N '' -f .ssh/id_rsa
   sudo chmod -R 777 /etc
   echo "StrictHostKeyChecking off" >> /etc/ssh/ssh_config
fi

# ls -als -a .ssh
cat /etc/ssh/ssh_config
