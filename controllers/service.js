import ApiError from "../exeptions/api-error.js";
import Service from "../models/servicModel.js";
import fs from 'fs';
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ServiceController{
    async create(req, res, next){
        try{
            const {img, desc, title} = req.body;
            const service = await Service.create({imgUrl:img, desc, title})
            res.json(service._doc)

        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async all(req, res, next){
        try{
            let search = req.query.search || ''
            const services = await Service.find({
                $or: [
                    { title: { $regex: new RegExp(search.toLowerCase(), 'i') }},
                    { desc: { $regex: new RegExp(search.toLowerCase(), 'i') }},
                ],
            }).sort({_id:-1}).lean()
            res.json(services)

        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }

    async getOne(req, res, next){
        try{
            const item = await Service.findById({_id: req.params.id})
            res.json(item)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }

    async update(req, res, next){
        try{
            const {img, desc, title} = req.body;
            const upItem = await Service.findByIdAndUpdate({_id: req.params.id}, {imgUrl: img, desc, title}, {new: true})
            res.json(upItem)

        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async remove(req, res, next){
        try{
            const delItem = await Service.findByIdAndDelete({_id: req.params.id})
            if(delItem.imgUrl){
                const filePath = path.resolve(__dirname, '..', 'static', delItem.imgUrl)
                fs.unlinkSync(filePath)
            }
            res.json({id: delItem._id})

        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }
}

export default new ServiceController;

