import mongoose from 'mongoose';
const { Schema } = mongoose;

const eqpsSchema = new Schema({
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


export default mongoose.model('Eqps', eqpsSchema)