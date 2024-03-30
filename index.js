const express = require('express');
const bodyParser = require('body-parser')
const _ = require('lodash')

require('dotenv').config()

const mongodb = require('./db/mongodb');
const { get_response } = require('./service');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.post('/data', async (req, res) => {
    const message = _.get(req, 'body.prompt');
    const response = await get_response(message)
    return res.json(response);
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})