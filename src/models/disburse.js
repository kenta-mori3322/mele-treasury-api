import { Schema, model } from 'mongoose'

/**
 * Disburse schema
 */
const disburseSchema = new Schema(
    {
        reference_id: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        amountMelc: {
            type: String,
            required: true,
        },
        amountMelg: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: false,
            default: '',
        },
    },
    {
        collection: 'disbursements',
        timestamps: true,
    }
)

class DisburseClass {}

/** Add unique index */
disburseSchema.index({ reference_id: 1 }, { unique: true })

/** Add the class method maps to the schema method */
disburseSchema.loadClass(DisburseClass)

const Disburse = model('Disburse', disburseSchema)

export default Disburse
