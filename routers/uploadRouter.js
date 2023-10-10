import expres from "express";
const router = expres.Router()
import path from "path"
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.post('/', (req, res)=>{
    const {image} = req.files
    let fileName = uuidv4() + ".jpg";
    image.mv(path.resolve(__dirname, '..', 'static', fileName))

   

    res.json(fileName)
})

export default router