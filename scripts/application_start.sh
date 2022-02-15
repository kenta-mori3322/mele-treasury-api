#!/bin/bash
sudo cp /home/ubuntu/.env /home/ubuntu/mele-treasury-api
cd /home/ubuntu/mele-treasury-api
sudo npm run pm2:stop
sudo npm run pm2:start