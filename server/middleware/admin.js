const express = require('express');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.headers('auth-token');

    if(!token) {
        res.status(401).send("Unauthorized, please login first");
    }

    try{
      const User = require('./models/users/models');

      let userexist = await User.findOne({email: req.body.email});
      let number = await User.findOne({contactNumber : req.body.contackNUmber});

      if(number) {
        return res.status(400).send("try with another number. email already exist");

      }
      if(email) {
        return res.status(400).send("try with another email. email already exist");

      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User ({
        ...req.body , password: hashedPassword
      })

      const response = await user.save();

      res.send(response);
      

    }catch(err) {
        res.status(401).send('Unauthorized User');
    }
}

export default auth;