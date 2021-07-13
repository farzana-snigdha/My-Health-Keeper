const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const specializedHealthInformation = require('./routers/specializedHealthInformation.routers');
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));


app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', specializedHealthInformation.routes);



module.exports = app;
