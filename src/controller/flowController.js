//Importeer de router van Express en het Mongoose model
const router = require('express').Router()
const flow = require('../model/flows')

// Geeft alle flows uit de database terug
router.get('/', (req, res) => {

    //Gebruik lean() omdat dit veel meer performance bied
    flow
        .find()
        .lean()
        .exec((err, flows) => {
            err ?
                res.status(500).json() :
                res.json({ flows })
        })
})

// Geeft een flow terug volgens een ID
router.get('/:id', (req, res) => {
    flow
        .findOne({ '_id': req.params.id })
        .lean()
        .exec((err, flow) => {
            err ?
                res.status(500).json() :
                res.json({ flow })
        })
})

// Exporteer de router voor gebruik in routes.js
module.exports = router