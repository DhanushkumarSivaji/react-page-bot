const express = require('express');
const app = express()
const cors = require('cors')

const PORT = 5000;

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors())

// Define Routes
app.use('/api', require('./routes/bot'));

app.get('/',(req,res)=>{
    res.json({"msg":"Welcome to ChatBot"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT} ...`)
})