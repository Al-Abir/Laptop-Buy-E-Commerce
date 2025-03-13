const productModel = require('../models/productModel')
const fs = require('fs')
const slugify = require('slugify')

const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(400).json({ error: "Name is required" });
            case !description:
                return res.status(400).json({ error: "Description is required" });
            case !price:
                return res.status(400).json({ error: "Price is required" });
            case !category:
                return res.status(400).json({ error: "Category is required" });
            case !quantity:
                return res.status(400).json({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res.status(400).json({ error: "Photo must be less than 1MB" });
        }

        // Create product
        const product = new productModel({ ...req.fields, slug: slugify(name) });

        // Handle photo
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message
        });
    }
}

//get product

const getProductController = async(req,res) =>{
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).json({
            success: true,
            total:products.length,
            message: "All Product",
            products,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message
        }); 
    }

}

const getSingleProductController = async(req, res)=>{
    try {
        const product = await productModel.findOne({slug:req.params.slug}).populate('category').select("-photo")
        res.status(200).send({
            success:true,
            message:"Single product fetched",
            product
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error while getting single product",
            error
        }); 
        
    }
}

module.exports = { createProductController,getProductController, getSingleProductController };
