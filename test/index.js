const axios = require('axios')
const assert = require('assert')
const { add } = require('winston')

const URL = 'http://localhost:3000'

const testInstance = axios.create({
    headers: {
        common: {
            'X-API-KEY': 't3st-s3cr3t-tok3n'
        }
    }
})

const address = 'mele1zsnyxrqkdt8e8sa8kjug8ftemn2qvu5x79hh9y'

describe('Mele Treasury Service', function () {
    this.timeout(0)

    it('Status can be fetched', async () => {
        let result = await testInstance.get(`${URL}/info`)

        assert.ok(result.data)

        assert.ok(result.data.distributed)
        assert.ok(result.data.burned)
    })

    let txHashDisburse
    let reference = 'example-reference' + Math.random().toString(36).substring(7)
    it('Funds can be disbursed', async () => {
        let result = await testInstance.post(`${URL}/disburse`, {
            amount: 10000,
            reference_id: reference,
            address: address,
        })

        assert.ok(result.data)
        assert.ok(result.data.hash)

        txHashDisburse = result.data.hash
    })

    it('Funds can be burned', async () => {
        let result = await testInstance.post(`${URL}/burn`, {
            amount: 10000,
        })

        assert.ok(result.data)
        assert.ok(result.data.hash)
    })

    it('Transaction status can be fetched', async () => {
        let result = await testInstance.get(`${URL}/status/${txHashDisburse}`)

        assert.ok(result.data)

        assert.ok(result.data.reference_id)
        assert.ok(result.data.hash)
        assert.ok(result.data.address)
        assert.ok(result.data.amount)

        assert.ok(result.data.reference_id === reference)
        assert.ok(result.data.hash === txHashDisburse)
        assert.ok(result.data.address === address)
        assert.ok(result.data.amount == 10000)
    })
    
    it('Address info can be fetched', async () => {
        let result = await testInstance.get(`${URL}/address/${address}`)

        assert.ok(result.data)

        assert.ok(result.data.length > 0)
        
        let melc = result.data.find(token => token.denom === 'umelc')

        assert.ok(melc)
        assert.ok(Number(melc.amount) > 0)
    })
})