import mongoose from 'mongoose';
const { Schema } = mongoose;


const signSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    workId: {
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }
},{timestamps: true});


export default mongoose.model('Signwork', signSchema)