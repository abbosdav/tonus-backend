import mongoose from 'mongoose';
const { Schema } = mongoose;

const checkSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});


export default mongoose.model('Check', checkSchema)