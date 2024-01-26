const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config({path:'./pass.env'})
const app = express();
const db = mysql.createConnection({
    host : process.env.H,
    user : process.env.U,
    password : process.env.P,
    database : process.env.DB
});
const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','hbs');

db.connect((error) =>{
    if(error){
        console.log(error)
    } else{
        console.log("MYSQL connected...")
    } 
})
//routes
app.use('/',require('./routes/pages'));
app.use('/auth', require('./routes/auth'))
app.listen(3019,()=>{
    console.log("Server started on port 3019");
})