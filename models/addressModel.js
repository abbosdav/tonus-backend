import mongoose from 'mongoose';
const { Schema } = mongoose;

const addresSchema = new Schema({
    title:{
        type: String,
        default: ""
    },
    link:{
        type: String,
        default: ""
    },
});

export default mongoose.model('Addres', addresSchema)