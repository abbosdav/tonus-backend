import ApiError from "../exeptions/api-error.js";
import Abonoment from "../models/abonomentModel.js";


class AbonomentController{
    async create(req, res, next){
        try{
            const { title, price, countDays, status} = req.body;
            const item = await Abonoment.create({ title, price, countDays, status})
            res.json(item._doc)

        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async all(req, res, next){
        try{
            const list = await Abonoment.find({status: true}).sort({_id:-1}).lean()
            res.json(list)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async alladmin(req, res, next){
        try{
            const list = await Abonoment.find().sort({_id:-1}).lean()
            res.json(list)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }

    async getOne(req, res, next){
        try{
            const item = await Abonoment.findById({_id:req.params.id})
            res.json(item)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }

    async update(req, res, next){
        try{
            const { title, price, countDays, status} = req.body;
            const upItem = await Abonoment.findByIdAndUpdate({_id: req.params.id}, { title, price, countDays, status}, {new: true})
            res.json(upItem)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async remove(req, res, next){
        try{
            const delItem = await Abonoment.findByIdAndDelete({_id: req.params.id})
            res.json({id: delItem._id})
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }
}

export default new AbonomentController;

