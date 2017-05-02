// Importeer de router van Express.js
const router = require('express').Router()

// Definieer de url voor de route en importeer de bijhorende controller
router.use('/flows', require('../controller/flowController'))

// Exporteer de router zodat deze gebruikt kan worden in index.js
module.exports = router;