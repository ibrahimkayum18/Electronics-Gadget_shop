const express = require('express');
const cors = require('cors');
const app = express()

const port = 5000

app.use(cors())
app.use(express.json())



app.post('/', (req, res) => {
    res.send('server is running')
})

app.listen('/', (req, res) => {
    console.log(`server is running on port: ${port}`);
})