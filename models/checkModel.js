import mongoose from 'mongoose';
const { Schema } = mongoose;

const comeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});


export default mongoose.model('Comes', comeSchema)