import mongoose from 'mongoose';
const { Schema } = mongoose;

const serviceSchema = new Schema({
    imgUrl: {
        type: String,
        default: ''
    },
    title:{
        type: String,
    },
    desc: {
        type: String,
    },
},{timestamps: true});


export default mongoose.model('Service', serviceSchema)