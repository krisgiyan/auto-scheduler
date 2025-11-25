const express = require('express');
const scrape = require('./routes/scrape');

const app = express();
app.use(express.json());

app.use('/scrape', scrape);

app.get('/checktime', (req, res) => {
  const now = new Date();

  res.json({
    iso: now.toISOString(), // UTC in ISO format
    local: now.toString(),  // Local representation (usually UTC unless TZ is set)
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone // What Node thinks is the TZ
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
