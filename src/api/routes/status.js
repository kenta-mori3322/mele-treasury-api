import { Router } from 'express'

import Disburse from '../../models/disburse'
import networkService from '../../services/network'

export default (app) => {
    const route = Router()
    app.use(route)

    route.get('/status/:txHash', async (req, res, next) => {
        const { txHash: hash } = req.params

        return Disburse.findOne({ hash })
            .then((disburse) => {
                if (!disburse) {
                    return res
                        .status(404)
                        .json({ errors: ['hash_id_not_found'] })
                }

                return disburse
            })
            .then((disburse) => {
                const meleInstance = networkService.meleProvider.getInstance()

                return meleInstance.query
                    .getTx(disburse.hash)
                    .then((result) => {
                        if (result.tx_result.code === 0) {
                            return {
                                status: 'success',
                                height: result.height,
                            }
                        }

                        return Promise.reject()
                    })
                    .catch(() => {
                        return { status: 'fail' }
                    })
                    .then((obj) => {
                        res.json({
                            reference_id: disburse.reference_id,
                            hash: disburse.hash,
                            address: disburse.address,
                            amount: disburse.amount,
                            ...obj,
                        })
                    })
            })
            .catch((error) => {
                next(error)
            })
    })
}
