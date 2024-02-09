const express = require('express');
const cors = require('cors');
const router = require('./router');
require('./connection');

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Listening on port - http://localhost:${PORT}`);
});
