// apiModel.js
const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
});

module.exports = mongoose.model('API', apiSchema);
