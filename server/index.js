const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
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
  const hashPassword = await bcrypt.hash(req.body.password,saltRounds)
  console.log(hashPassword);
  req.body.password =  hashPassword;


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

app.post('/login', async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({phoneNumber:req.body.phoneNumber})
  if (user) {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, process.env.SECRET_KEY);//secret key from the .env
      console.log(token);


      return res.send({ message: 'authorized', token });
    } else {
      return res.send({ message: 'Invalid password' });
    }
  }else{
    res.json({ message: 'phoneNUmber not registered' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})