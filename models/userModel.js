import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    roleUser: {
        type: String,
       default: "USER"
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    status:{
        type: Number,
        default: 0
    }
},{timestamps: true});


export default mongoose.model('User', userSchema)