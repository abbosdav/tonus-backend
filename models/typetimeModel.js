import mongoose from 'mongoose';
const { Schema } = mongoose;

const typetimeSchema = new Schema({
    title:{
        type: String
    }
},{timestamps: true});


export default mongoose.model('Typetime', typetimeSchema)