// Importeren van de benodigde modules en bestanden
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./src/config/routes')

// Express moet bodyparser gebruiken voor de request bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// De bodies worden omgezet naar application/json formaat
app.use(bodyParser.json())

// Definieer de endpoints van de API
app.use('/', routes)

// Start de applicatie op poort 4000
app.listen(4000, () => {
    console.log('API started on http://localhost:4000')
});