import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

import config from '../config'

export default {
    async connectMongoose() {
        try {
            await mongoose.connect(config.database.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            })
        } catch (e) {
            throw new Error(`Failed to connect to MongoDB. Error: ${e.message}`)
        }
    },
}
