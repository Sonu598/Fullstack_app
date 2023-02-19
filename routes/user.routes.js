const express = require("express")
const { UserModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const {name,email,password} = req.body
    try {
        bcrypt.hash(password, 5,async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                res.send({ "msg": "something went wrong", "erroe": err.message })
            }else{
                const user = new UserModel({name,email,password:hash})
                await user.save()
                res.send({ "msg": "new user has been register" })
            }
        });
        
    } catch (err) {
        res.send({ "msg": "something went wrong", "erroe": err.message })
    }

})

userRouter.post("/login", async (req, res) => {
    const { email,password} = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({ "msg": "Successfully Logged in", "token": token })
                }else{
                    res.send({ "msg": "Wrong Creadential" })
                }
            });
            
        } else {
            res.send({ "msg": "Wrong Creadential" })
        }
    } catch (err) {
        res.send({ "msg": "something went wrong", "erroe": err.message })
    }

})

module.exports = {
    userRouter
}