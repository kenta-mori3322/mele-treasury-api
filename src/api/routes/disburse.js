import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { compose } from 'compose-middleware'
import { Utils } from 'mele-sdk'

import * as middleware from '../middleware'
import Disburse from '../../models/disburse'
import networkService from '../../services/network'

export default (app) => {
    const route = Router()
    app.use(route)

    route.post(
        '/disburse',
        compose(
            celebrate({
                [Segments.BODY]: {
                    amount: Joi.number().positive().required(),
                    reference_id: Joi.string().required(),
                    address: Joi.string().required(),
                },
            }),
            middleware.checkSecretApiToken
        ),
        async (req, res, next) => {
            const { reference_id, address, amount } = req.body
            Disburse.findOne({ reference_id })
                .then((disburse) => {
                    if (disburse) {
                        return Promise.reject('reference_id_already_recorded')
                    }

                    return Disburse.create({
                        reference_id,
                        address,
                        amount,
                    })
                })
                .then((disburse) => {
                    return networkService
                        .sendDisburse(
                            disburse.address,
                            disburse.amount,
                            disburse.reference_id
                        )
                        .then(({ hash }) => {
                            disburse.hash = hash
                            return disburse.save()
                        })
                        .then(() => disburse)
                })
                .then(({ hash }) => {
                    return res.status(201).json({ hash })
                })
                .catch((error) => {
                    if (typeof error === 'string') {
                        return res.status(400).json({ errors: [error] })
                    }
                    next(error)
                })
        }
    )

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
