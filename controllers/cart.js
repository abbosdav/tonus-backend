import ApiError from "../exeptions/api-error.js";
import Cart from "../models/cartModel.js";


class CartController{
    async add(req, res, next){
        try{
            const { userId, abonId} = req.body;
            const item = await Abonoment.create({ userId, abonId})
            res.json(item._doc)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }
}

export default new CartController;

