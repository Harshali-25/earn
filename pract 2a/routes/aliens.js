const express = require('express');
const router = express.Router();
const Alien = require('../models/alien');

router.get('/', async (req, res) => {
    try {
        const aliens = await Alien.find();
        res.json(aliens);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});


router.post('/', async (req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    });

    try {
        const a1 = await alien.save();
        res.json(a1);
    } catch (err) {
        res.status(400).send('Error saving alien: ' + err.message);
    }
});

module.exports = router;