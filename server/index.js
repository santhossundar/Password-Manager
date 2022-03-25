const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const { encrypt, decrypt } = require('./encryptDecrypt');

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

app.post('/login', (req, res) => {
    const passwd = req.body;
    let query = 'SELECT passwd FROM user';

    db.query(query, (err, result) => {
        if (err) throw err;
        const decryptPasswd = decrypt({passwd: result[0].passwd});
        console.log(decryptPasswd);
        if (passwd.passwd === decryptPasswd) {
            res.send();
            console.log('succeed...');

        } else {
            console.log('login failed...');
        }
    })

})

app.get('/createdb', (req, res) => {
    let query = 'CREATE DATABASE IF NOT EXISTS passwords';
    db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

app.get('/createtable', (req, res) => {
    let query = 'CREATE TABLE IF NOT EXISTS mytable(password VARCHAR(255), title VARCHAR(255), iv VARCHAR(255))';
    db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('table created...');
    });
});

app.post('/addpassword', (req, res) => {
     const {account, password} = req.body;
     const passwd = encrypt(password);

    let query = `INSERT INTO mytable (data, account) VALUES ('${passwd}','${account}')`;
    db.query(query, (err, result) => {
        if(err) {
            console.log(err);
        }else{
            res.send("data added...");
        }
    });
});

app.get('/getall', (req, res) => {
    let query = 'SELECT id, data, account FROM mytable';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/delete', (req, res) => {
    const id = req.body;
    let query = `DELETE FROM mytable where id=${id.id}`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send('data deleted...');
    })
})

app.post('/decrypt', (req, res) => {
    const passwd = decrypt(req.body);
    res.send(passwd);
    
})

app.listen(port, () => {
    console.log("server is running...");
});

