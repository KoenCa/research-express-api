// Importeren van de benodigde modules en bestanden
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./src/config/db')

// Express moet bodyparser gebruiken voor de request bodies
app.use(bodyParser.urlencoded({
    extended: true
}))

// De bodies worden omgezet naar application/json formaat
app.use(bodyParser.json())

// Connecteer met de MongoDb Database en start de applicatie
db.connect(true, (err) => {
    if (err) {
        console.log(err.message)
    } else {
        // Definieer de endpoints van de API nadat connectie met de database is aangemaakt
        app.use('/', require('./src/config/routes'))
        
        app.listen(4000, () => {
            console.log('API started on http://localhost:4000')
        })
    }
})