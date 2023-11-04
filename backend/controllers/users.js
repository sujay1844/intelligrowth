const UserSchema = require("../models/UserModel")
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt')

exports.addUser = async (req,res) => {
    const {username, password, email}= req.body

    try{
        const user = await UserSchema.findOne({username})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = UserSchema({
            username, password, email
        })
        
        //validation

        if(user){
            return res.status(200).json({error:"User already exists!"})
        }
        if(!username || !password || !email){
            return res.status(400).json({error: "All fields are required!"})
        }
        await newUser.save()
        res.status(200).json({message: "User added"})
    } catch(error){
        res.status(500).json({error: "Server Error"})
    }
} 

exports.getUser = async (req,res) => {
    try{
        const users = await UserSchema.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error:"Server Error"})
    }
}

exports.deleteUser = async (req,res) => {
    const {id} = req.params
    UserSchema.findByIdAndDelete(id)
    .then((user) => {res.status(200).json({message:"User Deleted"})})
    .catch((err) => {res.status(500).json({error:"Server Error"})})
}

exports.LoginUser = async (req,res) => {
    const {username, password}= req.body

    const user = await UserSchema.findOne({username})
    try{

        //validation
        if(!user){
            return res.status(400).json({error:"User doesn't exist!"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.json(400).json({error:"Username or Password is invalid"})
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
        res.json({token, userID: user._id})
    } catch(error){
        res.status(500).json({error: "Server Error"})
    }
} 