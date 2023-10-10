import mongoose from 'mongoose';
const { Schema } = mongoose;

const Workout = new Schema({
    filial: {
        type: Schema.Types.ObjectId,
        ref: 'Addres'
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    during:{
        type: Schema.Types.ObjectId,
        ref: 'Typetime'
    },
    limit:{
        type:Number
    },
    status:{
        type:Boolean
    }

},{timestamps: true});


export default mongoose.model('Workout', Workout)