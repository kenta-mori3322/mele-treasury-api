import bodyParser from 'body-parser'
import { errors } from 'celebrate'

import routes from '../api'

export default (app) => {
    app.use(bodyParser.json())

    // register api routes
    app.use('/', routes())

    // handle validation errors
    app.use(errors())

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        return res.status(400).json({
            errors: ['endpoint_not_found'],
        })
    })

    app.use((err, req, res) => {
        res.status(err.status || 500)
        res.json({
            errors: {
                message: err.message,
            },
        })
    })
}
