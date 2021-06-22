const express = require("express");
const cors = require('cors')
const router=require("./routers/userRouter")

const app = express();
app.use(express.json({extende:true}))
app.use(cors())

app.use('/users',router)
app.get('/',(req,res) => res.send(`API Running`))

module.exports=app