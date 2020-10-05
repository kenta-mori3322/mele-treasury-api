import { Router } from 'express'
import { Utils } from 'mele-sdk'

import * as middleware from '../middleware'
import networkService from '../../services/network'

export default (app) => {
    const route = Router()
    app.use(route)

    route.get('/info', middleware.checkSecretApiToken, (req, res, next) => {
        const meleInstance = networkService.meleProvider.getInstance()

        meleInstance.query.treasury
            .getTreasury()
            .then(({ distributed, burned }) => {
                if (distributed && distributed.length)
                    distributed = Utils.fromUmelc(distributed[0].amount, 'melc')
                else distributed = '0'

                if (burned && burned.length)
                    burned = Utils.fromUmelc(burned[0].amount, 'melc')
                else burned = '0'

                return res.json({
                    distributed: {
                        amount: distributed,
                        denom: 'melc',
                    },
                    burned: {
                        amount: burned,
                        denom: 'melc',
                    },
                })
            })
            .catch((error) => {
                next(error)
            })
    })
}
