import express from 'express'
import config from './config'

import Logger from './loaders/logger'

async function startServer() {
    const app = express()

    const { default: module } = require('./loaders')
    await module(app)

    app.listen(config.port, (err) => {
        if (err) {
            throw err
        }

        Logger.info(`Server listening on port: ${config.port} 🎉.`)
    })
}

startServer().catch((err) => {
    Logger.error(err)
    process.exit(-1)
})
