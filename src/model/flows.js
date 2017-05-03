// Importeer het database configuratie bestand
const db = require('../config/db')
const mongoose = db.getConnection()

// ObjectId type uit Mongoose halen voor eigen gebruik
const schema = mongoose.Schema
const ObjectId = schema.ObjectId

// Gebruik db connectie om een nieuw mongoose model aan te maken
const Flow = mongoose.model('Flow', {
    trashed: Boolean,
    name: String,
    flow_group_id: ObjectId,
    synchronous: Boolean,
    updated_at: Date,
    created_at: Date,
    error_components: Array,
    lock_user_id: ObjectId,
    tracing_ttl: String,
    components: Array
})

// Exporteer het model voor gebruik in de controller
module.exports = Flow