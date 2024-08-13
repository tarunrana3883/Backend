const userModel=require('../Models/usermodel')
const bcrypt = require('bcrypt')

exports.createuser=async(req,res)=>{
    try{
    const data=req.body
    const passbcrypt = await bcrypt.hash(data.password , 5)
    data.password = passbcrypt
   const createdata= await userModel.create(data)
    return res.send({msg:createdata})
}
catch (err) {return res.send(err.message)}

}