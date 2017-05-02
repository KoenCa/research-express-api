// Importeren van mongoose
const mongoose = require('mongoose')

// Mongoose eigen promise library is deprecated
// Gebruik de ES6 promises
mongoose.Promise = global.Promise

// Gebruik mongoose om connectie te maken met de database
const db = mongoose.connect('mongodb://localhost/flows', (err) => {
    err ?
        console.log('Can\'t connect to MongoDB', err) :
        console.log('Connected to MongoDB');
});

// Exporteer de connectie met de database voor gebruik in het model
module.exports = db