//Importeer de router van Express en het Mongoose model
const router = require('express').Router()
const flow = require('../model/flows')

// Endpoint dat bereikbaar is op http://localhost:4000/flows/
// Geeft alle flows uit de database terug
router.get('/', (req, res) => {

    //Gebruik lean() omdat dit veel meer performance bied
    flow.find().lean().exec((err, flows) => {
        if (err) {
            res.status(500).json()
        }

        if(flows) {
            res.json({flows})
        }
    })
})

// Exporteer de router voor gebruik in routes.js
module.exports = router