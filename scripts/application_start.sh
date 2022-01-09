#!/bin/bash
sudo cp /home/ubuntu/.env /home/ubuntu/mele-treasury-api-dev
cd /home/ubuntu/mele-treasury-api-dev
sudo npm run build
sudo npm run pm2:stop
sudo npm run pm2:start