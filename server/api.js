const express = require('express');
const apiRouter = express.Router();

const emailsRouter = require('./emails');
apiRouter.use('/emails', emailsRouter);

module.exports = apiRouter;
