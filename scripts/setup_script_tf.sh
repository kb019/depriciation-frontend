#!/bin/sh


echo "Hurray, Inside Bash script file";

# terraform init
cd ~/

isTerraformInstalled="false"
terraformPackage=$(apt list --installed | grep -i "terraform");

isAnsibleInstalled="false"
ansiblePackage=$(apt list --installed | grep -i "ansible");

if [ -n "$terraformPackage" ]; then
    isTerraformInstalled="true";
    echo "terraform is installed";
fi

if [ -n "$ansiblePackage" ]; then
    isAnsibleInstalled="true";
    echo "ansible is installed";
fi

sudo chmod 555 /etc/sudoers 
sudo chmod 555 /etc/sudoers.d/README
if [ "$isTerraformInstalled" = "false" ]; then
        echo "installing Terraform"
        sudo snap remove curl
        sudo apt install curl
        sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
        curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --yes --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list > /dev/null
        sudo apt update
        sudo apt-get install terraform
fi

if [ "$isAnsibleInstalled" = "false" ]; then 
        echo "installing ansible"
        sudo apt install software-properties-common
        sudo add-apt-repository --yes --update ppa:ansible/ansible
        sudo apt-get install ansible
        echo "before ansible verison"
        ansible --version
        echo "after ansible version"
fi

mkdir -p terraform
cp /var/jenkins_home/workspace/depreciation_pipeline_frontend/terraform-files/*.tf terraform
cd terraform

terraform init
terraform init -input=false
terraform apply -input=false -auto-approve

keyPair=$(terraform output -raw public_key)
ec2InstanceIp=$(terraform output -raw instance_ip_addr);
privateKey=$(terraform output -raw private_key)


cd /var/jenkins_home/workspace/depreciation_pipeline_frontend
mkdir -p .ssh

echo "$keyPair" > .ssh/id_rsa.pub
echo "$privateKey" > private-key.pem
echo "ubuntu@$ec2InstanceIp" > inventory.ini


