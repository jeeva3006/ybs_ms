const express = require('express');
const app = express();
const cors = require('cors');
const ybs = require('./src/schedule');
const client = require('./src/controller/client');

const start = () => new ybs().schedule();
start();

const PORT = process.env.PORT || 1650;

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', client);

app.get('/', async (req, res) => {
    const result = await start();
    res.send(`ybsMs started and listening at ${result}`);
});

app.listen(PORT, () => console.log(`ybs from ${PORT}.`));