const express = require("express");
const cors = require("cors");
const router = require("./routers/userRouter");
const imgRouter = require("./routers/upload");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const medReminderRouter = require('./routers/medReminder.route');
const cycleTracker =require('./routers/cycleTracker')
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(medReminderRouter);
app.use("/user", cycleTracker);
app.use("/user", router);
app.use("/api", imgRouter);
app.get("/", (req, res) => res.send(`API Running`));

module.exports = app;
