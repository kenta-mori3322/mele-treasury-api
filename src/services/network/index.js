import { Utils } from 'mele-sdk'
import meleProvider from './mele'

import Logger from '../../loaders/logger'

export default {
    meleProvider,
    async sendDisburse(address, amountMelc, referenceId) {
        const signer = meleProvider.getSigner()
        if (!signer) {
            throw new Error('Network Signer is not configured.')
        }

        const meleInstance = meleProvider.getInstance()
        if (!meleInstance) {
            throw new Error('Network is not configured.')
        }

        const amount = Utils.toUmelc(amountMelc.toString(), 'melc')
        const transaction = meleInstance.treasury
            .disburse(
                address,
                [{ denom: 'umlc', amount: amount.toString() }],
                referenceId
            )
            .sendTransaction()

        return Utils.promisify(transaction)
            .then((result) => {
                if (!result || !result.hash) {
                    return Promise.reject('invalid_response_from_network')
                }

                return result
            })
            .catch((error) => {
                console.error(error)
                Logger.error(
                    `[Disburse] Network error. Error: ${error.message}`
                )
                return Promise.reject('network_disburse_error')
            })
    },
    async sendBurn(amountMelc) {
        const signer = meleProvider.getSigner()
        if (!signer) {
            throw new Error('Network Signer is not configured.')
        }

        const meleInstance = meleProvider.getInstance()
        if (!meleInstance) {
            throw new Error('Network is not configured.')
        }

        const amount = Utils.toUmelc(amountMelc.toString(), 'melc')
        const transaction = meleInstance.treasury
            .burn([{ denom: 'umlc', amount: amount.toString() }])
            .sendTransaction()

        return Utils.promisify(transaction)
            .then((result) => {
                if (!result || !result.hash) {
                    return Promise.reject('invalid_response_from_network')
                }

                return result
            })
            .catch((error) => {
                console.error(error)
                Logger.error(`[Burn] Network error. Error: ${error.message}`)
                return Promise.reject('network_burn_error')
            })
    },
}
