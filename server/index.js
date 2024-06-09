const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const dbConnect = require('./src/db/connection');
const cors = require('cors');

dbConnect();
const app = express();
app.use(cors());
require('dotenv').config();
//body parser
app.use(express.json());

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  terms: { type: Boolean, required: true },
});

const User = mongoose.model('User', userSchema);
const port = process.env.PORT;

app.post('/register', async (req, res) => {
  try {
    console.log('received request:',req.body);

    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashPassword;

    const phoneNumberUserExists = await User.exists({ phoneNumber: req.body.phoneNumber });
    const emailUserExists = await User.exists({ email: req.body.email });

    if (phoneNumberUserExists) {
      return res.status(409).json({ message: 'phoneNumber number already exists' });
    } else if (emailUserExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    await User.create(req.body);
    return res.json({ message: 'User registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

app.get('/register', async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.post('/login',async(req,res)=>{
  console.log(req.body)
  //STEP 1:
  //check if phone number exist
  const user  = await User.findOne({email: req.body.email})
  if(user){
  const isMatched=  await bcrypt.compare(req.body.password, user.password);
    if(isMatched){
      const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
      res.json({message: "Authorized", token,user})
    }else {
      res.status(401).json({message: "Invalid Password"})
    }
  }else{
    res.status(401).json({message: "email not registered"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
