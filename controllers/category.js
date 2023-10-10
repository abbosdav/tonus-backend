import ApiError from "../exeptions/api-error.js";
import Category from "../models/categoryModel.js"
import Subcategory from "../models/subcategoryModel.js"

class CategoryController{
    async create(req, res, next){
        try{
            const {title, status} = req.body;
            const item = await Category.create({title, status})
            res.json(item._doc)

        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async all(req, res, next){
        try{
            const items = await Category.find().sort({_id:-1}).lean()
            res.json(items)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }

    async getOne(req, res, next){
        try{
            const item = await Category.findById({_id: req.params.id})
            res.json(item)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }

    async update(req, res, next){
        try{
            const {title, status} = req.body;
            const upItem = await Category.findByIdAndUpdate({_id: req.params.id}, {title, status}, {new: true})
            res.json(upItem)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async remove(req, res, next){
        try{
            const delItem = await Category.findByIdAndDelete({_id: req.params.id})
            res.json({id: delItem._id})
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async alldata(req, res, next){
        try{
            let obj = {}
            let category = await Category.find().lean()
            category = await Promise.all(category.map(async cat => {
                cat.subcategory = await Subcategory.find({catId: cat._id})
                obj.title = cat.title;
                obj.subcat = cat.subcategory;
                return obj
            }))

            res.json(category)

        }catch(e){
            console.log(e)
            ApiError.internal("Post yaratilmadi", e)
        }
    }
}

export default new CategoryController;

