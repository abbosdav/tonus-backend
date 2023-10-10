import mongoose from 'mongoose';
const { Schema } = mongoose;


const subscribeSchema = new Schema({
    _id:{ type: Number},
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    abonId: {
        type: Schema.Types.ObjectId,
        ref: 'Abonoment',
        default: null
    },
    workCount:{
        type: Number,
        default: 0
    }
},{ _id:false, timestamps: true });


export default mongoose.model('Subscribe', subscribeSchema)