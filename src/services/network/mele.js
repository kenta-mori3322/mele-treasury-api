import { Mele, MnemonicSigner } from 'mele-sdk'

import config from '../../config'
import Logger from '../../loaders/logger'

function createSigner() {
    try {
        return new MnemonicSigner(config.network.mnemonic)
    } catch (e) {
        Logger.error(`Unable to connect to the network server ${e.message}`)
        return null
    }
}

function createMele(signer) {
    try {
        return new Mele({
            nodeUrl: config.network.nodeUrl,
            chainId: config.network.chainId,
            signer,
        })
    } catch (e) {
        Logger.error(`Unable to connect to the network server ${e.message}`)
        return null
    }
}

class MeleProvider {
    constructor() {
        this.signer = createSigner()
        this.mele = createMele(this.signer)
    }

    getInstance() {
        return this.mele
    }

    getSigner() {
        return this.signer
    }
}

export default new MeleProvider()
