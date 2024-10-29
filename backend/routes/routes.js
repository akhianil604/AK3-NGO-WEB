const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const controllers = require('../controllers/controllers')
const User = require('../models/User');
const Query = require('../models/Query');
const bcrypt = require('bcrypt');
const auth = require('../auth');

dotenv.config();
const router = express.Router();

// For regular users
router.post('/registerUser', controllers.register);

router.post('/login', controllers.login);

router.post('/newQuery', auth.authenticateToken, controllers.newQuery);

router.get('/queriesFromRole', auth.authenticateToken, auth.authenticateRole, controllers.queriesFromRole);

router.post('/acceptQuery', auth.authenticateToken, controllers.acceptQuery);



module.exports = router;
