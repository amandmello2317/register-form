const express = require('express')
const ConnectDb = require('./Db')
const  UserRoute  = require('./Route/UserRoute')
const cors = require('cors')
const Productrouter = require('./Route/ProductRoute')

const app = express()
const port = 5000

ConnectDb()
app.use(express.json())
app.use(cors())


app.use("/api/user", UserRoute )
app.use('/api/product', Productrouter)


app.listen(port, () => {
    console.log(`Server is on ${port}`);
})