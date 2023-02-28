const express = require('express');
const ideasRouter = express.Router();
const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req,res) => {
    res.send(getAllFromDatabase('ideas'));
})

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/:ideaId',(req,res) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
})

// GET /api/ideas/:ideaId to get a single idea by id.

ideasRouter.get('/:ideaId', (req,res) => {
    res.send(req.ideas);
})

// PUT /api/ideas/:ideaId to update a single idea by id.

ideasRouter.put('/:ideaId',(req,res) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
})
// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId',(req,res) => {
    const isDeleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (isDeleted) {
        res.status(204);
      } else {
        res.status(500);
      }
    res.send();
    })
module.exports = ideasRouter;