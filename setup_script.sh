#!/bin/sh


echo "Hurray, Inside Bash script file";

# terraform init
cd ~/

isTerraformInstalled="false"
terraformPackage=$(apt list --installed | grep -i "terraform");

echo "$terraformPackage"
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

sudo apt install software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
ansible --version
cd /var/jenkins_home/workspace
cd depreciation_pipeline_frontend
# ls -a

terraform init -input=false
echo "terraform apply"
terraform apply -input=false -auto-approve
