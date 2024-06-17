const express = require('express');
var bodyParser = require('body-parser')

const app = express();
app.use( bodyParser.json() );

const port = 3000;

app.post('/', (req, res) => {

    console.log(req.body);
    res.status(200).send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});