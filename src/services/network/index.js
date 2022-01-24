import { Utils } from 'mele-sdk'
import meleProvider from './mele'

import Logger from '../../loaders/logger'

export default {
    meleProvider,
    async sendDisburse(address, amountMelc, amountMelg, referenceId) {
        const signer = meleProvider.getSigner()
        if (!signer) {
            throw new Error('Network Signer is not configured.')
        }

        const meleInstance = meleProvider.getInstance()
        if (!meleInstance) {
            throw new Error('Network is not configured.')
        }

        const amountUmelc = Utils.toUmelc(amountMelc.toString(), 'melc')
        const amountUmelg = Utils.toUmelg(amountMelg.toString(), 'melg')
        
        const transaction = await meleInstance.treasury
            .disburse(
                address,
                [{ denom: 'umelc', amount: amountUmelc.toString() }, { denom: 'umelg', amount: amountUmelg.toString() }],
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
        const transaction = await meleInstance.treasury
            .burn([{ denom: 'umelc', amount: amount.toString() }])
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
