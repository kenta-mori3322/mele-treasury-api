import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { compose } from 'compose-middleware'

import * as middleware from '../middleware'
import networkService from '../../services/network'

export default (app) => {
    const route = Router()
    app.use(route)

    route.post(
        '/burn',
        compose(
            celebrate({
                [Segments.BODY]: {
                    amount: Joi.number().positive().required(),
                },
            }),
            middleware.checkSecretApiToken
        ),
        async (req, res, next) => {
            const { amount } = req.body
            networkService
                .sendBurn(amount)
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
}
