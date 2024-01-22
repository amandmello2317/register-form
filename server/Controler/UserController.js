const UserSchema = require("../Model/UserSchema");
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const JWT_SECERETE = 'hello'
// SIGNUP

const UserSignUp = async(req, res) => {
    try {
        const {name, email, password, cpassword} = req.body
        console.log(req.body);

        if(password !== cpassword){
            return res.json('wrong password')
        }else{

            const salt = await bcrypt.genSalt(10)
            const pass = await bcrypt.hash(password, salt)
    
            const user = new UserSchema({
                name,
                email,
                password:pass
            })
    
            const saveUser = user.save() 
           
            res.send({saveUser: user})

        }
    
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")
    }

}


// Login user
const UserLogin = async(req, res) => {
    try{
        const {email, password} = req.body
        const val = await UserSchema.findOne({ email })

        if(!val) {
            res.json("Email Not Found")
        }

        const match = await bcrypt.compare(password, val.password)

        if(!match) {
            return res.json("Password not match")
        }

        const data = val.id
        const token = await jwt.sign(data, JWT_SECERETE)
        console.log(token);

        res.json({success: true, token, user: val})

    }catch(error) { 
        console.error(error.message);
        res.status(500).send("Internal Error")

    }
    
}

module.exports = {UserSignUp, UserLogin}