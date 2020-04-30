const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/users');
const bucket = require('./routes/Bucket');
const bodyParser = require('body-parser');
const cors = require('cors');

//dotenv middleware
dotenv.config();

//connection to database
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Database connected'));

//bodyparser url
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin: *");
    res.header('Access-Control-Allow-Methods: POST, GET,PUT,DELETE');
    res.header('Access-Control-Allow-Headers: Content-Type');
 
    next();
});

app.use(cors());

//route middleware
app.use('/api/user/', router);
app.use('/api/bucket/', bucket);

PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App started at ${PORT}`));