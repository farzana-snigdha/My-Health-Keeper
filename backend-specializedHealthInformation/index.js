const connectDB = require('./models/db')
require('dotenv').config()
const app = require("./app");
const PORT = process.env.PORT;
const specializedHealthInformation = require('./routers/specializedHealthInformation.routers');

// Connect Database
connectDB();



app.use('/api', specializedHealthInformation.routes);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


  