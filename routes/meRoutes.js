const express = require('express');
const {getCurrentUser} = require('../controllers/meController');

const meRouter = express.Router();

meRouter.get('/', getCurrentUser)

module.exports = meRouter;
