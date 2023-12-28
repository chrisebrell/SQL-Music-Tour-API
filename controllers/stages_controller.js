// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Stages } = db
const { Op } = require('sequelize')

// FIND ALL STAGES
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stages.findAll({
            order: [ [ 'start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

//FIND A SPECIFIC STAGE
stages.get('/:id', async (req, res) => {
    try {
        const foundStages = await Stages.findOne ({
            where: { stage_id: req.params.id }
        });
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE AN STAGE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stages.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE AN STAGE
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stages.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} Stage'(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE AN STAGE
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stages.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} Stage'(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// EXPORT
module.exports = stages
