const ProductSchema = require("../Model/ProductSchema");


// Insert
const ProductInsert = async (req, res) => {

    try {
        const { name, number } = req.body
        const userId = req.adminId

        console.log(userId);

        const product = await new ProductSchema({
            name,
            number,
            userId
        })
        const saveProduct = await product.save()
        // console.log(saveProduct)
        res.json(saveProduct)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")

    }
}

// View
const productView = async (req, res) => {
    const userId = req.adminId
    console.log(userId);
    try {
        const product = await ProductSchema.find({ userId: userId }).populate("userId","-password")
        // console.log(saveProduct)
        res.json(product)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")

    }
}

// Delete

const DeleteProduct = async (req, res) => {
    try {
        let product = await ProductSchema.findById(req.params.id)
        if (!product) {
            return res.status(404).send("Not Found")

        }
        user = await ProductSchema.findByIdAndDelete(req.params.id)
        res.json({ product: product })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}

// Upddate

const UpdateProduct = async (req, res) => {
    const { name, number } = req.body
    try {
        const newData = {}
        if (name) {
            newData.name = name
        }
        if (number) {
            newData.number = number
        }
        let data = await ProductSchema.findById(req.params.id)
        console.log(req.params.id);

        if (!data) {
            return res.status(404).send("Not Found")
        }

        data = await ProductSchema.findByIdAndUpdate(
            req.params.id,
            { $set: newData },
            { new: true }
        )
        res.json({ data })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}

module.exports = { ProductInsert, productView, DeleteProduct, UpdateProduct }

