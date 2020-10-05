import config from '../../config'

export const checkSecretApiToken = (req, res, next) => {
    if (
        !config.security.secretApiToken ||
        req.get('X-API-KEY') !== config.security.secretApiToken
    ) {
        return res.status(401).json({ message: 'Unauthorized.' })
    }

    return next()
}
