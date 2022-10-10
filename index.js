const express = require('express');
const app = express();
const cors = require('cors');
const ybs = require('./src/schedule');

const start = () => new ybs().schedule();
start();

const PORT = process.env.PORT || 1650;

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    start();
    res.send('ybsMs started');
});

app.listen(PORT, () => console.log(` from ${PORT}.`));