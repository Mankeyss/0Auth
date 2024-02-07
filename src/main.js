const express = require('express');
const path = require('path');
const uri = require('url');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./dbmodels/user');
const cors = require('cors');

const app = express();
const port = process.env.port || 6942;

const db_URI = process.env.db_URI;

mongoose.connect(db_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(port))
.catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'Sites')));
app.use(express.static(path.join(__dirname, 'Sites', 'home')));
app.use(express.static(path.join(__dirname, 'Sites', 'externalLogin', 'loginext.js'), { type: 'application/javascript' }));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'Sites', 'home', 'home.html'))
});

app.get('/authorize', (req,res) => {
    res.sendFile(path.join(__dirname, 'Sites', 'externalLogin', 'loginext.html'))
});

app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, 'Sites', 'login', 'login.html'));
});

app.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname, 'Sites', 'register', 'register.html'));
});

app.post('/api/v1/login', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username && password) {
        User.find({ username: username, password: password })
        .then((result) => {
            if(result.length >= 1) {
                const urlParams = new URLSearchParams(req.originalUrl);
                if(/*Has redir*/urlParams.has('redir')) {
                    res.status(200).redirect(uri.format({
                        pathname: urlParams.get('redir'),
                        query: {
                            "username": username,
                            "icon": 0,
                            "id": 0,
                        }
                    }));
                    console.log(result);
                } else {
                    res.status(200).redirect(uri.format({
                        pathname: '/dashboard',
                        query: {
                            "username": username,
                            "icon": 0,
                            "id": 0,
                    }}));
                }
            } else {
                res.status(401).send('No user matching that information!');
            }
        }).catch((err) => console.log(err))
    } else {
        res.status(401).send('Not enough information!');
    }
});

app.post('/api/v1/register', (req,res) => {
    const username = req.body.username;
    const displayname = req.body.displayname;
    const password = req.body.password;
    if(username && displayname && password) {
        User.find({ username: username })
        .then((result) => {
            if(result.length == 0) {
                const user = new User({
                    username: username,
                    displayname: displayname,
                    password: password
                });
                user.save().then((result) => {
                    res.status(200).redirect('/dashboard');
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                res.status(401).send('User already exists!');
            }
        }).catch((err) => console.log(err))
    } else {
        res.status(401).send('Not enough information!');
    }
});

app.get('/api/v1/buttoncss', (req,res) => {
    res.sendFile(path.join(__dirname, 'button', 'buttoncss.css'))
});

app.get('/api/v1/datadecoder', (req,res) => {
    res.setHeader('Content-Type', 'text/javascript').sendFile(path.join(__dirname, 'dataDecoder', 'dataDecoder.js'))
});

app.get('/test', (req,res) => {
    res.sendFile(path.join(__dirname, 'testSite.html'))
});

app.get('/integrate', (req,res) => {
    res.sendFile(path.join(__dirname, 'Sites', 'integrate', 'integrate.html'))
});

app.get('/dashboard', (req,res) => {
    res.sendFile(path.join(__dirname, 'Sites', 'dashboard', 'dashboard.html'))
});

app.get('/dataerror', (req,res) => {
    res.sendFile(path.join(__dirname, 'Sites', 'dataError', 'dataerror.html'))
});

app.use((req, res) => {
    res.status(404).redirect('/');
});

console.log(`Listening at http://localhost:${port}`);