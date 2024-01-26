const mysql = require("mysql");
//const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//dotenv.config({path:'./pass.env'})

const db = mysql.createConnection({
    host : process.env.H,
    user : process.env.U,
    password : process.env.P,
    database : process.env.DB
});
exports.register = (req,res) =>{
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    db.query('SELECT email FROM users WHERE email = ?',[email],async(error,results) => {
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('register',{
                message :'E-MAIL already in use'
            })
        } else if(password !== passwordConfirm){
            return res.render('register',{
                message :'PASSWORDS DO NOT MATCH'
            });
        }
        let hashedPassword = await bcrypt.hash(password , 2);
        console.log(hashedPassword);
        db.query('INSERT INTO users SET ?',{name : name ,email : email,password : hashedPassword},(error,results) => {
            if(error){
                console.log(error);
            } else{
                console.log(results);
                return res.render('register',
                {message:'USER SUCCESFULLY REGISTERED'});
            }
        })

    });

}