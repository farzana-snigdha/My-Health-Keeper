const express = require("express");
const cors = require('cors')

const app = express();
app.use(express.json({extende:false}))
app.use(cors())

app.get('/',(req,res) => res.send(`API Running`))

module.exports=app