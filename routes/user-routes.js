const express = require('express');
const {addUser, 
       getAllUser, 
       getUser,
       updateUser,
       deleteUser
      } = require('../controllers/userController');

const router = express.Router();

router.post('/users', addUser);
router.get('/users', getAllUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


module.exports = {
    routes: router
}