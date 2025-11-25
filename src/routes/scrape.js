const express = require('express');
const router = express.Router();
const { scrapeNextLevel } = require('./nextlevel');

router.get('/nextlevel', async (req, res) => {
  try {
    await scrapeNextLevel();
    // res.send(result.source_code);
    res.json('Lesson booked successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

module.exports = router;
