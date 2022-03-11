const express = require('express');

const {validateID, validateBody} = require('./projects-middleware')

const Project = require('./projects-model')

const router = express.Router();


//GET
router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(next)
})


//GET ID
router.get("/:id", validateID, (req, res) => {
    res.json(req.project)
})


//POST
router.post('/', validateBody, (req, res, next) => {
    Project.insert({
        name: req.name,
        description: req.description,
        completed: req.completed
    })
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(next)
})


//PUT ID
router.put('/:id', validateID, validateBody, async (req, res, next) => {
    let changes = {...req.body, completed: req.completed};
    const updateProject = await Project.update(req.params.id, changes)
    try {
        res.status(400).json(updateProject)
    } catch (err) {
        next(err)
    }
})


//DELETE ID
router.delete("/:id", validateID, async (req, res, next) => {
    const id = req.params.id
    try {
        const results = await Project.remove(id)
        res.status(201).json(results)
    } catch (err) {
        next(err)
    }
});


//GET ID ACTIONS
router.get("/:id/actions", validateID, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            {
                res.json(actions)
            }
        })
        .catch(next)
})


module.exports = router