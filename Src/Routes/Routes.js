const express=require("express")
const router = express.Router()
const {createuser,getApI, LogInUser} = require('../controller/usercontroller')

router.post('/CreateUserData',createuser)
router.get('/getAllUserData',getApI)
router.post('/LogInUser',LogInUser)

router.all('/*',(req,res)=>{
    return res.send({ Status: false, msg: "Invalid URL" })
})
module.exports = router