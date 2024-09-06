const usermodel = require('../Models/usermodel');
const userModel = require('../Models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createuser = async (req, res) => {
    try {
        const validName = /^[a-zA-Z ]+$/;
        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const validPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/


        const data = req.body
        const { name, email, password } = data

        if (Object.keys(data).length == 0) return res.send({ Staus: false, msg: "Enter the data" })
        if (!name) return res.send({ Staus: false, msg: "Enter the Name" })
        if (!validName.test(name)) return res.send({ Staus: false, msg: "Enter the valid name" })

        if (!email) return res.send({ Staus: false, msg: "Enter the Email" })
        if (!validEmail.test(email)) return res.send({ Staus: false, msg: "Enter the Valid email" })

        const checkMailId = await userModel.findOne({ email: email })
        if (checkMailId) return res.send({ Staus: false, msg: "User Already Present" })

        if (!password) return res.send({ Staus: false, msg: "Enter the Password" })
        if (!validPassword.test(password)) return res.send({ Staus: false, msg: "Enter the Valid password" })

        const passbcrypt = await bcrypt.hash(data.password, 5)
        data.password = passbcrypt
        const createdata = await userModel.create(data)
        return res.send({ status: true, msg: "suf Created", Data: createdata })
    }
    catch (err) { return res.send(err.message) }

}
exports.getApI = async (req, res) => {
    try {
        const data = await usermodel.find()
        return res.send({ Status: true, msg: "Get All the data", Data: data })
    }
    catch (e) {
        return res.status(500).send({ status: false, msg: e.message })
    }
}

exports.LogInUser = async (req, res) => {
    try {
        const data = req.body;
        const {email, password } = data;
        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const validPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

        
        if (Object.keys(data).length == 0) return res.send({ Staus: false, msg: "Enter the data" })
           
            if (!email) return res.send({ Staus: false, msg: "Enter the Email" })
            if (!validEmail.test(email)) return res.send({ Staus: false, msg: "Enter the Valid email" })
    
            const checkMailId = await userModel.findOne({ email: email })
            if (!checkMailId) return res.send({ Staus: false, msg: "SignUp first" })
    
            if (!password) return res.send({ Staus: false, msg: "Enter the Password" })
            if (!validPassword.test(password)) return res.send({ Staus: false, msg: "Enter the Valid password" })
                let checkpass = await bcrypt.compare(password.trim(),checkMailId.password)
            if (!checkpass) return res.send({ Staus: false, msg: "Wrong Password",data:checkpass })
                
                let id = checkMailId._id
                
                let token = jwt.sign({
                    UserId:id,
                    AuthorName:'Tarun'
                },
                "SecrectKeysdb",
                {expiresIn:'12h'}
            )

            return res.send({status:true,token,id})

    }
    catch (e) {
        return res.status(500).send({ status: false, msg: e.message })
    }
}

