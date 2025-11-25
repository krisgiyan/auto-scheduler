const express = require('express');
const scrape = require('./routes/scrape');

const app = express();
app.use(express.json());

app.use('/scrape', scrape);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
