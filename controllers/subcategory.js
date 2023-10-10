import ApiError from "../exeptions/api-error.js";
import Subcategory from "../models/subcategoryModel.js"

class SubcategoryController{
    async create(req, res, next){
        try{
            const {title, count, price, time, status, category} = req.body;
            const item = await Subcategory.create({title, count, price, time, catId: category, status})
            const resitem = await Subcategory.findById({_id:item._doc._id}).populate('catId')
            res.json(resitem)

        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async all(req, res, next){
        try{
            const items = await Subcategory.find().populate({ path: 'catId', select: 'title' }).sort({_id:-1})

            res.json(items)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }

    async getOne(req, res, next){
        try{
            const item = await Subcategory.findById({_id: req.params.id})
            res.json(item)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }

    async update(req, res, next){
        try{
            const {title, count, price, time, status, category} = req.body;
            const upItem = await Subcategory.findByIdAndUpdate({_id: req.params.id}, {title, count, price, time, catId: category, status}, {new: true}).populate({ path: 'catId', select: 'title' })
            res.json(upItem)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async remove(req, res, next){
        try{
            const delItem = await Subcategory.findByIdAndDelete({_id: req.params.id})
            res.json({id: delItem._id})
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }
}

export default new SubcategoryController;

