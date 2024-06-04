const express = require('express')
const dbConnect = require('./src/db/connection')


dbConnect()
const app = express()
require('dotenv').config()
//body parser
app.use(express.json())

const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: String, 
  address: String,
  gender: String,
  phoneNumber:Number,
  email: String,
  password: String,
  confirmPassword: String,
  bloodGroup: String,
});


const User = mongoose.model('User', userSchema);
const port = process.env.PORT


app.post('/register',async (req, res) => {
  console.log(req.body.phoneNumber)
  console.log(req.body)
  const phoneuserExists = await User.exists({phoneNumber:req.body.phoneNumber})
  const emailuserExists = await User.exists({email:req.body.email})
  console.log(phoneuserExists);
  console.log(emailuserExists);
  if(phoneuserExists){
   return res.send({message:'PhoneNumber already exists'})
  }else if(emailuserExists){
    return res.send({message:'email already exists'})
  }
  await User.create(req.body)
  return res.send({message:'user registration successful'})
})

app.get('/register', async (req, res) => {
  const data = await User.find()
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})