const router = require('express').Router()
const flow = require('../model/flows')

router.get('/', (req, res) => {
    flow.find().lean().exec((err, flows) => {
        if (err) {
            res.status(500).json()
        }

        if(flows) {
            res.json({flows})
        }
    })
})

module.exports = router;