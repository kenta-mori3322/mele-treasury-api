import { Router } from 'express'

import address from './routes/address'
import disburse from './routes/disburse'
import burn from './routes/burn'
import info from './routes/info'
import status from './routes/status'

export default () => {
    const app = Router()

    address(app)
    disburse(app)
    burn(app)
    info(app)
    status(app)

    return app
}
