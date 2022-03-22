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

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS passwords';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS mytable(password VARCHAR(255), title VARCHAR(255), iv VARCHAR(255))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('table created...');
    });
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

app.get('/getall', (req, res) => {
    let sql = 'SELECT password, title FROM mytable';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.listen(port, () => {
    console.log("server is running");
});

