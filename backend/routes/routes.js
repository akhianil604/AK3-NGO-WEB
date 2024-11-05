const express = require('express');
const dotenv = require('dotenv')
const controllers = require('../controllers/controllers')
const auth = require('../auth');

dotenv.config();
const router = express.Router();

router.post('/registerUser', controllers.register);
router.post('/login', controllers.login);

router.post('/newAnonQuery', controllers.newAnonQuery);
router.post('/newRegisteredQuery', auth.authenticateToken, controllers.newRegisteredQuery);

router.get('/getQueriesFromRole', auth.authenticateToken, controllers.getQueriesFromRole);
router.get('getUserQueries', auth.authenticateToken, controllers.getUserQueries);
router.get('/getAssignedQueries', auth.authenticateToken, controllers.getAssignedQueries);
router.get('/getPendingQueries', auth.authenticateToken, controllers.getPendingQueries);
router.get('/getQueryStatus', auth.authenticateToken, controllers.getQueryStatus);

router.post('/sendQueryToRole', auth.authenticateToken, controllers.sendQueryToRole);

router.post('/acceptQuery', auth.authenticateToken, controllers.acceptQuery);
router.post('/resolveQuery', auth.authenticateToken, controllers.resolveQuery);
router.post('/rejectQuery', auth.authenticateToken, controllers.rejectQuery);

module.exports = router;
