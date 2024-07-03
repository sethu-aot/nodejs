const express = require("express");
const session = require('express-session');
const path = require("path");

const app = express();
const { getHomePage, getLoginPage, getRegisterPage, putLoginData, putRegisterData, logout } = require('./index');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.get("/", getHomePage);
app.get("/login", getLoginPage);
app.get("/register", getRegisterPage);
app.post("/login", putLoginData);
app.post("/register", putRegisterData);
app.get('/logout', logout);

app.listen(3000, () => {
    console.log("server started on http://localhost:3000");
});
