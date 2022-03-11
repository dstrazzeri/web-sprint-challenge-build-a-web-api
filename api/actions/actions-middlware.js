const Actions = require('./actions-model');


async function validateId(req, res, next) {
    try {
        const {id} = req.params
        const actions = await Actions.get(id)
        if (!actions) {
            next({status: 404, message: 'User not found.'})
        } else {
            req.actions = actions
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'Action not found.',
        })
    }
}


async function validateBody(req, res, next) {
    const {project_id, description, notes, completed} = req.body
    if (!project_id || !description || !notes) {
        res.status(400).json({
            message: 'Missing project_id, description, or notes.'
        })
    } else {
        req.project_id = project_id
        req.description = description
        req.notes = notes
        req.completed = completed
        next()
    }

}


module.exports = {validateId, validateBody}