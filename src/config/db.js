// Importeren van mongoose
const mongoose = require('mongoose')

// Variabele voor db
let db

// Mongoose eigen promise library is deprecated
// Gebruik de ES6 promises
mongoose.Promise = global.Promise

// Methode om connectie te maken als app in productie is
// of om gewoon mongoose terug te geven voor tijdens het testen
exports.connect = (isProduction, done) => {
    // In productie dus maak connectie met gewone database
    if (isProduction) {
        // Gebruik mongoose om connectie te maken met de database
        db = mongoose.connect('mongodb://localhost/flows', (err) => {
            err ?
                done(new Error(`Can't connect to MongoDB`)) :
                done()
        })
    // Niet in productie geef gewoon standaard mongoose module terug
    // Kan ook vervangen worden met een connectie naar een test database
    } else {
        db = mongoose
        done()
    }
}

// Methode om connectie op te vragen
exports.getConnection = () => {
    return db
}