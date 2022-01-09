sudo apt-get update
sudo apt upgrade -y

sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get install -y build-essential

sudo apt install npm -y

sudo npm -g install pm2
sudo chmod -R 0755 /usr/lib/node_modules

sudo apt install -y mongodb