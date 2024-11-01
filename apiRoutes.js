// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// GET all APIs
router.get('/apis', (req, res) => {
    const query = 'SELECT * FROM apis';
    db.query(query, (error, results) => {
        if (error) {
            console.error("Failed to fetch APIs:", error);
            res.status(500).json({ error: 'Failed to fetch APIs' });
        } else {
            res.json(results);
        }
    });
});

// POST a new API
router.post('/apis', (req, res) => {
    const { name, url, description, category } = req.body;
    const query = 'INSERT INTO apis (name, url, api_description, api_category) VALUES (?, ?, ?, ?)';
    db.query(query, [name, url, description, category], (error, results) => {
        if (error) {
            console.error("Failed to add API:", error);
            res.status(500).json({ error: 'Failed to add API' });
        } else {
            res.status(201).json({ message: 'API added successfully', id: results.insertId });
        }
    });
});

module.exports = router;

 