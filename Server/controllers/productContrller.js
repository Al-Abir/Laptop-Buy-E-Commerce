const productModel = require('../models/productModel')
const fs = require('fs')
const slugify = require('slugify')
const mongoose = require('mongoose');
const { errorMonitor } = require('events');
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
        product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error creating product",
        error: error.message,
      });
    }
  };
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
const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .populate('category', 'name') // Only populate 'name' from category
            .select("-photo");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Single product fetched successfully",
            product
        });

    } catch (error) {
        console.error(`Error fetching product with slug "${req.params.slug}":`, error.message);
        res.status(500).json({
            success: false,
            message: "Error while getting single product",
            error: error.message
        });
    }
};

// product photo controller
const productPhotoController = async (req, res) => {
    try {
        const { pid } = req.params;

        // Validate ID format before conversion
        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format",
            });
        }

        const productId = new mongoose.Types.ObjectId(pid);

        const product = await productModel.findById(productId).select("photo");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (!product.photo || !product.photo.data) {
            return res.status(404).json({
                success: false,
                message: "Product photo not found",
            });
        }

        res.set("Content-Type", product.photo.contentType);
        return res.status(200).send(product.photo.data);

    } catch (error) {
        console.error("Error fetching product photo:", error);
        res.status(500).json({
            success: false,
            message: "Error while getting product photo",
            error: error.message,
        });
    }
};
//delete Controller

const deleteController =  async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"Product delete succesfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting product photo",
            error: error.message,
        });
    }

}

const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name) return res.status(400).json({ error: "Name is required" });
        if (!description) return res.status(400).json({ error: "Description is required" });
        if (!price) return res.status(400).json({ error: "Price is required" });
        if (!category) return res.status(400).json({ error: "Category is required" });
        if (!quantity) return res.status(400).json({ error: "Quantity is required" });
        if (photo && photo.size > 1000000) {
            return res.status(400).json({ error: "Photo must be less than 1MB" });
        }

        // Update product
        const product = await productModel.findByIdAndUpdate(
            req.params.pid, // Ensure this matches the route parameter
            { ...req.fields, slug: slugify(name) },
            { new: true }
          );

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Handle photo
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
          }
          await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error.message
        });
    }
};


// product filter Controller

const productFilterController = async(req, res) => {

    try {
        const {checked,radio} = req.body;
         let args = {}
         if(checked.length>0) args.category = checked
         if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]}
         const products = await productModel.find(args);
         res.status(200).send({
            success:true,
            products
         })
        
    } catch (error) {
      
        res.status(400).send({
            success:false,
            message:"Error While filtering Products",
            error
        })
    }

}

// product count
const  productCountController = async (req, res)=>{
     try {  
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total,
            
        })
        
     } catch (error) {
         console.log(error)     
         res.status(400).send({
            success:false,
            error,
            message:"Error in product count"
         })
        
        }


}

const  productListController = async(req, res)=>{
     try {
        const perPage =1;
        const page = req.params.page ? req.params.page:1
        const products = await productModel
        .find({})
        .select("-photo")
        .skip((page-1)*perPage)
        .limit(perPage)
        .sort({createdAt:-1})
        res.status(200).send({
            success:true,
            products,
        })
        
     } catch (error) {
           res.status(400).send({
            success:false,
            message: 'error in per page ctrl'
           })
     }

}

// search product controller
const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const results = await productModel.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } }
        ]
      }).select("-photo");
      res.json(results);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error in Search Product API",
        error
      });
    }
  };
  

  // related product controller
  const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select('-photo').limit(3).populate('category');  

        res.status(200).send({
            success: true,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting related product",
            error
        });
    }
};


module.exports = { createProductController,getProductController, 
                  getSingleProductController,productPhotoController,
                  deleteController,updateProductController,productFilterController,
                   productCountController, productListController,searchProductController ,relatedProductController};
