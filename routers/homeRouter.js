import expres from "express";
const router = expres.Router()
import mongoose from 'mongoose';
import Addres from "../models/addressModel.js"
const { Schema } = mongoose;


const Time = mongoose.model('Time', new Schema({
    start:{
        type: String,
        default: ""
    },
    end:{
        type: String,
        default: ""
    }
}));



const Phone = mongoose.model('Phone', new Schema({
    title:{
        type: String,
        default: ""
    }
}));



router.post('/table', async(req, res)=>{
    let time = await Time.findOne().lean()
    if(!time){
        await Time.create({start: req.body.start, end:req.body.end})
    }

    const newTime = await Time.findOneAndUpdate({_id: time._id}, {start: req.body.start, end:req.body.end}, {new:true});
    res.json(newTime)
})

router.post('/addresinfo', async(req, res)=>{
    const {label, link} = req.body.data
    const addres = await Addres.create({title: label, link:link})
    res.json(addres)
})

router.delete('/addresinfo/:id', async(req, res)=>{
    const addres = await Addres.findByIdAndDelete(req.params.id)
    res.json(addres._id)
})

router.post('/phone', async(req, res)=>{
    const phone = await Phone.create({title: req.body.data})
    res.json(phone)
})

router.delete('/phone/:id', async(req, res)=>{
    try {
        if(req.params.id){
            const phone = await Phone.findByIdAndDelete({_id:req.params.id})
            res.json(phone._id)
        }
    }catch (e) {
        console.log(e)
    }

})

router.get('/', async(req, res)=>{
    let time = await Time.findOne().lean()
    let addres = await Addres.find().lean()
    let phone = await Phone.find().lean()
    res.json({time, addres, phone})
})



export default router