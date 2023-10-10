import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    status:{
        type: Boolean,
        default: false
    }
},{timestamps: true});


export default mongoose.model('Category', categorySchema)