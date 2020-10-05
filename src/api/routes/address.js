import { Router } from 'express'

import networkService from '../../services/network'
import * as middleware from '../middleware'

export default (app) => {
    const route = Router()
    app.use(route)

    route.get(
        '/address/:address',
        middleware.checkSecretApiToken,
        (req, res, next) => {
            const { address } = req.params
            const meleInstance = networkService.meleProvider.getInstance()

            meleInstance.query
                .getAccountInfo(address)
                .then(({ value }) => {
                    res.status(200).json(value.coins)
                })
                .catch((error) => {
                    next(error)
                })
        }
    )
}
