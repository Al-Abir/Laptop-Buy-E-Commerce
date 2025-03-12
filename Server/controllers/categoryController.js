const  createCategoryController = async() =>{
     try {
        const {name} = req.body
        
     } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:"Error in Category"
        })
     }
}

module.exports = { createCategoryController}