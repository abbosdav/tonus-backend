import mongoose from 'mongoose';
const { Schema } = mongoose;

const subcategorySchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    count: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
    catId:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    
    status:{
        type: Boolean,
        default: false
    }
},{timestamps: true});


export default mongoose.model('Subcategory', subcategorySchema)