const categoryModel = require('../models/categoryModel')
const slugify = require('slugify')


// create
const  createCategoryController = async(req, res) =>{
     try {
        const {name} = req.body;
       if(!name){
         return res.status(200).send({message:"Name is required"});

       }
       const existingCategory = await categoryModel.findOne({name})
       if(existingCategory){
         return res.status(200).send({
            success:true,
            message:"Category Already Exists"
         })
       }
       const category = await categoryModel({name,slug:slugify(name)}).save();
       res.status(201).send({
         success:true,
         message:"new category created",
         category
       })
         
     } catch (error) {
        //(error)
        res.status(500).send({
            success: false,
            error,
            message:"Error in Category"
        })
     }
}

// update
const updateCategoryController = async (req ,res)=>{
   try {
      const {name}= req.body
      const {id}= req.params
      const category = await categoryModel.findByIdAndUpdate(id,
         {name,slug:slugify(name) },
         {new:true}
   );
   res.status(200).send({
      success:true,
      message:"Category Updated Successfully",
      category
   })
      
   } catch (error) {
      //(error)
      res.status(500).send({
         success:false,
         message:"Error while updating category",
         error
      })
   }
}

//getAll category
const categoryAllController = async (req, res)=>{
    try {
      const categories = await categoryModel.find({})
      res.status(200).send({
         success:true,
         message:"All Categoris List",
         categories
      })
    } catch (error) {
      //(error)
      res.status(500).send({
         success:false,
         error,
         message:"Error while getting all categories"
      })
    }

}

// single category
 
const singleCategoryController = async(req, res) =>{
    try {
     
      const category = await categoryModel.findOne({slug:req.params.slug})
      res.status(200).send({
         success:true,
         message:"Get Single Category Succesfully",
         category
      })

      
    } catch (error) {
      //(error)
      res.status(500).send({
         success:false,
         error,
         message:"Error while Single category"
      })
    }
}

// delete category

const deleteCategoryController = async (req, res) => {
   try {
      const { id } = req.params; // Correct way to get id from URL params

      const deletedCategory = await categoryModel.findByIdAndDelete(id);

      if (!deletedCategory) {
         return res.status(404).send({
            success: false,
            message: "Category not found",
         });
      }

      res.status(200).send({
         success: true,
         message: "Category Deleted Successfully",
      });

   } catch (error) {
      //(error);
      res.status(500).send({
         success: false,
         error,
         message: "Error while deleting category",
      });
   }
};




module.exports = { createCategoryController,updateCategoryController,categoryAllController,singleCategoryController,deleteCategoryController}