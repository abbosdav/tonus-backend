import mongoose from 'mongoose';
const { Schema } = mongoose;

const abonomentSchema = new Schema({
    title:{
        type: String,
    },
    price: {
        type: Number,
    },
    countDays: {
        type: Number,
    },
    status:{
        type: Boolean,
        default: false
    }
},{timestamps: true});


export default mongoose.model('Abonoment', abonomentSchema)