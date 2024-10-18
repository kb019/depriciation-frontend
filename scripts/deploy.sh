#!/bin/sh

sudo chmod -R 777 /etc/ssh
echo "StrictHostKeyChecking off" >> /etc/ssh/ssh_config
chmod 700 private-key.pem
ip=$(awk '{ print $1 }' inventory.ini)

echo "ip is,$ip"

if [ -n "$ip" ]; then 
    ssh-copy-id -f "-o IdentityFile private-key.pem" $ip
fi 

ls -a

chmod 775 playbook.yaml
# ansible -v
ansible-playbook  playbook.yaml -i inventory.ini