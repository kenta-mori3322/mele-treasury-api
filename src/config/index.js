import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (!envFound) {
    throw new Error("Couldn't find .env file.")
}

export default {
    /**
     * Web server running port
     */
    port: parseInt(process.env.PORT, 10) || 3000,

    /**
     * MongoDB Database configuration
     */
    database: {
        /**
         * Connection String URL
         */
        url: process.env.DATABASE_URL,
    },

    /**
     * Blockchain network configuration
     */
    network: {
        nodeUrl: process.env.NETWORK_NODE_URL || '',
        chainId: process.env.NETWORK_CHAIN_ID || '',
        mnemonic: process.env.NETWORK_MNEMONIC || '',
    },

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    security: {
        /**
         * The x Api token
         */
        secretApiToken: process.env.SECRET_API_TOKEN,
    },
}
