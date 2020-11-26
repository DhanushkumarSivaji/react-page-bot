const express = require('express');
const app = express()
const cors = require('cors')
const connectDB = require('./config/db');

require('./models/registration');
require('./models/demand');
require('./models/coupons');

const PORT = 5000;

//connect DB
connectDB()


// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors())

// Define Routes
app.use('/dialogflowroutes', require('./routes/dialogFlowRoutes'));
app.use('/', require('./routes/fulfillmentRoutes'));

app.get('/',(req,res)=>{
    res.json({"msg":"Welcome to ChatBot"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT} ...`)
})