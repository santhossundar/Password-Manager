const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const { encrypt, decrypt } = require('./encrypter');

const app =  express();

const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    port:'3306',
    password:'toor',
    database:'passwords',
});

app.post('/addpassword', (req, res) => {
     const {account, password} = req.body;

     const hashedPassword = encrypt(password);

     db.query("INSERT INTO mytable (password, title, iv) VALUES (?,?,?)",
     [hashedPassword.password, account, hashedPassword.iv],
     (err, result) => {
         if(err) {
             console.log(err);
         }else{
             res.send("success");
         }
     });
});

app.listen(port, () => {
    console.log("server is running");
});

