const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        trim:true,
        maxLength: 50
    },
    password:{
        type:String,
        required: true,
        trim:true,
        maxLength: 50
    },
    email:{
        type:String,
        required: true,
        trim:true,
        maxLength: 50
    },
    savedIncome: [{type: mongoose.Schema.Types.ObjectId, ref:"Income"}],
    savedExpense: [{type: mongoose.Schema.Types.ObjectId, ref:"Expense"}],

}, {timestamps: true})

UserSchema.pre('save', async function (next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch(error){
        next(error)
    }
})

module.exports = mongoose.model('Users', UserSchema)