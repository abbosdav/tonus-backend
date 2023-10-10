import ApiError from "../exeptions/api-error.js";
import Typetime from "../models/typetimeModel.js"
import Addres from "../models/addressModel.js"


class TypetimeController {
    async create(req, res, next){
        try{
            const { title } = req.body;
            const item = await Typetime.create({title})
            res.json(item._doc)

        }catch(e){
            ApiError.internal("Time type yaratilmadi", e)
        }
    }

    
    async all(req, res, next){
        try{
            const time = await Typetime.find()
            const address = await Addres.find()
            res.json({time, address})

        }catch(e){
            ApiError.internal("Time type yaratilmadi", e)
        }
    }


    async update(req, res, next){
        try{
            let data = req.body;
            const time = await Typetime.findByIdAndUpdate({_id: req.body._id}, data, {new: true})
            res.json({ time })

        }catch(e){
            ApiError.internal("Time type yaratilmadi", e)
        }
    }
}

export default new TypetimeController;