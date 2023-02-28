const express = require('express');
const minionsRouter = express.Router();
const {
    getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    deleteFromDatabasebyId
    } = require('./db');

// .param sert à "attacher" des propriétés à la requête pour s'en resservir
// dans une autre route avec le même paramètre.
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
    });

// GET /api/minions to get an array of all minions.

minionsRouter.get('/', (req,res) => {
    res.send(getAllFromDatabase('minions'));
})

// POST /api/minions to create a new minion and save it to the database.

minionsRouter.post('/:minionId',(req,res) => {
    console.log(req.body);
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);

})

// GET /api/minions/:minionId to get a single minion by id.

minionsRouter.get('/:minionId', (req,res) => {
    res.send(req.minions);
})
// PUT /api/minions/:minionId to update a single minion by id.

minionsRouter.put('/:minionId',(req,res) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
})
// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId',(req,res) => {
    const isDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (isDeleted) {
        res.status(204);
      } else {
        res.status(500);
      }
    res.send();

})
module.exports = minionsRouter;