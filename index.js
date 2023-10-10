import dotenv from "dotenv";
dotenv.config();
import path from "path"
import { fileURLToPath } from 'url';
import express  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import errorHandler from "./middlewares/errorHandlingMiddleware.js";
import router from "./routers/index.js";

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(fileUpload({}))

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser())
app.use('/api', router)

app.use(errorHandler)
const PORT = process.env.PORT || 3001;
const DB = process.env.DB;


const start = async ()=>{
    try{
        await mongoose.connect(DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        }).then(() =>{
            console.log('MongoDB ga ulanish hosil qilindi...');
        });
        app.listen(PORT, ()=> console.log(`Server started ${PORT}`))

    }catch(e){
        console.log(e)
        `DB ga ulanishda xatolik yuz berdi?`;
    }
}

start();