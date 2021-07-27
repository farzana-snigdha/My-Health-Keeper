const express = require("express");
const cors = require("cors");
const router = require("./routers/userRouter");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const medReminderRouter = require("./routers/medReminder.route");
const cycleTracker = require("./routers/cycleTracker.routers");
const medDoses = require("./routers/medDose.route");
const payment=require('./routers/payment.routers')
const specializedHealthInformation = require('./routers/specializedHealthInformation.routers');
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', specializedHealthInformation);
app.use(medReminderRouter);
app.use(medDoses);

app.use("/user", cycleTracker);
app.use("/user", router);

app.use('/payment',payment)

const { spawn } = require('child_process');
app.get('/', (req, res) => {

    // 
   
    const pyProg = spawn('python',['SMS.controllers.py','snigdha']);

    pyProg.stdout.on('data', function(data) {

        console.log(data.toString());
        // res.write(data);
        // res.end('end');
    });

    pyProg.stderr.on('data', function(data) {

        console.error(data.toString());
        // res.write(data);
        // res.end('end');
    });

    pyProg.on('close', function(code) {

        console.log(code);
        // res.write(data);
        // res.end('end');
    });
})

module.exports = app;
