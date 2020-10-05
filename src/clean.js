import Logger from './loaders/logger'
import mongooseLoader from './loaders/mongoose'
import Disburse from './models/disburse'

async function start() {
    await mongooseLoader.connectMongoose()
    Logger.info('MongoDB loaded and connected!')
}

start().then(async () => {
    Logger.info(`Cleanup all disbursements...`)
    await Disburse.deleteMany({})
    process.exit()
})
