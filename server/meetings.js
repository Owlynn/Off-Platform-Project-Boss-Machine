const express = require('express');
const meetingsRouter = express.Router();
const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    deleteFromDatabasebyId,
    createMeeting 
  } = require('./db');

// GET /api/meetings to get an array of all meetings.

meetingsRouter.get('/', (req,res) => {
    res.send(getAllFromDatabase('meetings'));
});

// POST /api/meetings to create a new meeting and save it to the database.

meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

// DELETE /api/meetings to delete all meetings from the database.

meetingsRouter.delete('/',(req,res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;