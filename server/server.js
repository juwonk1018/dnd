const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');
var bodyParser = require("body-parser");

app.use(cors());
app.use('/api', api);
app.use(bodyParser.urlencoded({ extended : false }));

const port = 3002;
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})