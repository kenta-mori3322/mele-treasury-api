import mongooseLoader from './mongoose'
import Logger from './logger'

export default async (expressApp) => {
    await mongooseLoader.connectMongoose()
    Logger.info('MongoDB loaded and connected!')

    const { default: module } = require('./express')
    await module(expressApp)
}
