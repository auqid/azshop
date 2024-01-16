import  express  from "express";
import Product from '../models/productModel.js'
import asynchHandler from "../middleware/asyncHandler.js";


const router = express.Router();



router.get('/',asynchHandler (async (req,res)=>{
    const products = await Product.find({});
    res.json(products)
}))

router.get('/:id',asynchHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product)
    }
    res.status(404).json({message:'Product not found'})
    
}))

export default router;