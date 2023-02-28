const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingsRouter = require('./ideas');

app.use('/minions',minionsRouter);
app.use('/ideas',ideasRouter);
app.use('/meetings',meetingsRouter)
module.exports = apiRouter;
