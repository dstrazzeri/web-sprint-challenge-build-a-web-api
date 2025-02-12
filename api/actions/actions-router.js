const express = require('express');
const router = express.Router();

const Actions = require('./actions-model')
const {validateId, validateBody} = require('./actions-middlware');

// GET
router.get('/', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})


// GET ID
router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.actions)
})


//POST
router.post('/', validateBody, async (req, res, next) => {
    try {
        const action = await Actions.insert({
            project_id: req.project_id,
            description: req.description,
            notes: req.notes,
            completed: req.completed
        })
        res.status(201).json(action)
    } catch (error) {
        next(error)
    }
})


//PUT ID
router.put('/:id', validateId, validateBody, (req, res, next) => {
    Actions.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
    })
        .then(() => {
            return Actions.get(req.params.id)
        })
        .then(action => {
            res.json(action)
        })
        .catch(next)
})


// DELETE ID
router.delete('/:id', validateId, async (req, res, next) => {
    try {
        const action = await Actions.remove(req.params.id)
        res.status(200).json(action)
    } catch (err) {
        next(err)
    }

})


module.exports = router