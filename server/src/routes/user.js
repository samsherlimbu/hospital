
const bcrypt = require('bcrypt');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const router = Router();




router.post('/register', async (req, res) => {
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
  
  
  router.post('/login',async(req,res)=>{
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

  router.get('/users',async(req,res)=>{
    const data = await User.find()
    res.json(data)
  })

  module.exports = router
  