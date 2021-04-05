const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '.')));

app.get('/healthcheck', (req, res) => {
  res.status(200).send();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
