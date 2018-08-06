const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

const router = express.Router()

router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    const hashCost = 10;
  
    try {
      const passwordHash = await bcrypt.hash(password, hashCost);
      const userDocument = new UserModel({ username, passwordHash });
      await userDocument.save();
      
      res.status(200).send({ username });
      
    } catch (error) {
      res.status(400).send({
        error: 'req body should take the form { username, password }',
      });
    }
  });

module.exports = router