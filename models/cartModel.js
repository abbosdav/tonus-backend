import mongoose from 'mongoose';
const { Schema } = mongoose;



const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    abonId: {
        type: Schema.Types.ObjectId,
        ref: 'Abonoment'
    },
},{timestamps: true});


export default mongoose.model('Cart', cartSchema)