const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

const routeURLs = require('./routes/route');

dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
//app.use(express.json())
app.use(cors());

//const CONNECTION_URL = 'mongodb+srv://sabrina_susmi:sus123@cluster0.pyyns.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log('DB connected'),  { useNewUrlParser: true, useUnifiedTopology: true })
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

app.use('/app', routeURLs);
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}.`))