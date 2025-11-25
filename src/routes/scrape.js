const express = require('express');
const router = express.Router();
const { scrapeNextLevel } = require('./nextlevel');

router.get('/nextlevel', async (req, res) => {
  try {
    const result = await scrapeNextLevel();
    // console.log(result.source_code);

    // res.setHeader('Content-Type', 'text/html');
    res.send(result.source_code);
    // res.json(result.source_code);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

module.exports = router;
