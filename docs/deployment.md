# Treasury Service deployment documentation

## Prerequisites
To start using the treasury service, you'll need install some prerequisites.

- Git
- Node > 12
- MongoDB > 4.23

### Download the source code with Git
First, you‘ll need to generate ssh keys and import it to the github.com, this will allow git to identify with your GitHub account.

#### Generate SSH key on your server with the command:
```
sudo ssh-keygen
```

#### Copy public key to clipboard:
```
sudo cat /root/.ssh/id_rsa.pub
```

Go to your GitHub repository settings. Add paste the copied public key to the Deploy Keys section.

Now you can clone the codebase from the repository.
```
cd /home
sudo git clone git@github.com:melechain/mele-treasury-api.git
cd mele-treasury-api
```

## Installation

### Install NodeJS, npm and pm2

We recommend installing NodeJS from the package manager. This can be done with the following command:

```
sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

To compile and install native addons from npm you also need to install build tools:
```
sudo apt-get install -y build-essential
```

Now, we can install the packages that are necessary for the treasury service, and this can be done with the command:
```
sudo npm install
```

PM2 is just an npm package, so it can be installed with:
```
sudo npm -g install pm2
sudo chmod -R 0755 /usr/lib/node_modules
```

### Install MongoDB

MongoDB can be installed from the package manager with the command:
```
sudo apt install -y mongodb
```

And that's it. MongoDB is installed and it's up and running.
You can check if everything is running ok with the following command:
```
sudo systemctl status mongodb
```

## Configuring

By default, the treasury service comes with a `.env.example` file. You'll need to rename this file to just `.env` regardless of what environment you're working on. This can be done with the command:
```
sudo cp .env.example .env
```

It's now just a case of editing this new `.env` file and setting the values of your setup.
Notice: Any values with spaces in them should be contained within double-quotes.

The `.env` file is highly sensitive. Your team of developers and even Continuous Integration services probably don't need that file. 

**DATABASE_URL** *required*
**Type**: String
**Description**: The URL of the MongoDB server.
**Format**:
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

**SECRET_API_TOKEN** *required*
**Type**: String
Description: Secret API token

**NETWORK_NODE_URL** *required*
**Type**: String
**Description**: URL of the blockchain node 

**NETWORK_CHAIN_ID** *required*
**Type**: Number
**Description**: Blockchain chain ID 

**NETWORK_MNEMONIC** *required*
**Type**: String
**Description**: Operator mnemonic phase.
*Note: Mnemonic phase should be enclosed in double quotes.*

## Building project

This can be done with the command:
```
sudo npm run build
```

### PM2 Process management
- Start
`npm run pm2:start`
- Stop
`npm run pm2:stop`
- Restart
`npm run pm2:restart`
- Logs
`npm run pm2:logs`

If you want more lines, append the --lines argument to npm run pm2:logs command.
Example:
`npm run pm2:logs --lines 20`





