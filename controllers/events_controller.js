// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Events, Meet_Greet, Set_Time, Stage, Band } = db
const { Op } = require('sequelize')

// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Events.findAll({
            order: [ [ 'start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

//FIND A SPECIFIC EVENT
events.get('/:name', async (req, res) => {
    try {
        const foundEvents = await Events.findOne ({
            where: { name: req.params.name },
            include: [
                { 
                    model: Meet_Greet, 
                    as: "meet_greets", 
                    attributes: { exclude: [ "event_id", "band_id" ] },
                    include: {
                        model: Band, 
                        as: "band", 
                    } 
                },
                { 
                    model: Set_Time, 
                    as: "set_times",
                    attributes: { exclude: [ "event_id", "stage_id", "band_id" ] },
                    include: [
                        { model: Band, as: "band" },
                        { model: Stage, as: "stage" }
                    ]
                },
                { 
                    model: Stage, 
                    as: "stages",
                    through: { attributes: [] }
                }
            ]
        });
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE AN EVENT
events.post('/', async (req, res) => {
    try {
        const newEvent = await Events.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE AN EVENT
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Events.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} Event'(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE AN EVENT
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Events.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} Event'(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// EXPORT
module.exports = events
