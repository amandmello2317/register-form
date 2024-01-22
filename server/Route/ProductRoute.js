const express = require('express')
const UserAuth=require('../middleware/UserAuth')
const {ProductInsert,productView, DeleteProduct, UpdateProduct} = require('../Controler/ProductConntroller')

const Productrouter = express.Router()

Productrouter.post("/productinsert",UserAuth,ProductInsert)
Productrouter.get("/productView",UserAuth,productView)
Productrouter.delete("/productDelete/:id",UserAuth,DeleteProduct)
Productrouter.put("/productUpdate/:id",UserAuth,UpdateProduct)


module.exports = Productrouter
