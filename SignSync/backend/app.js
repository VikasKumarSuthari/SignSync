const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const approute = require('./routes');


app.use(cors()); // Allow requests from all origins



const PORT = process.env.PORT || 3000;
app.use(bodyParser.json({limit: '100mb'}));

app.use(express.json({limit:'100mb'}));

app.use(bodyParser.urlencoded({extended:true}));



app.use(express.static(path.join(__dirname, 'build')));

app.get("/",(req,res)=>{
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
})

app.use('/en', approute);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`)
});
