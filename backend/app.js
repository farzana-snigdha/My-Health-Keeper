const express = require("express");
const cors = require('cors')
const router=require("./routers/userRouter")

const app = express();
app.use(express.json({extende:false}))
app.use(cors())

app.use('/auth',router)
app.get('/',(req,res) => res.send(`API Running`))

module.exports=app