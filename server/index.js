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
  address: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  terms: { type: Boolean, required: true },
  confirmPassword: { type: String, required: true },
  bloodGroup: { type: String, required: true },
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
      return res.status(400).send({ message: 'phoneNumber number already exists' });
    } else if (emailUserExists) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    await User.create(req.body);
    return res.status(201).send({ message: 'User registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
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

app.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, process.env.SECRET_KEY); // secret key from the .env
        console.log(token);
        return res.send({ message: 'Authorized', token });
      } else {
        return res.status(401).send({ message: 'Invalid password' });
      }
    } else {
      return res.status(404).send({ message: 'phoneNumber not registered' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
