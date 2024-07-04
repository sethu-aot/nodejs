const { v4: randomId } = require("uuid");
const jwt = require('jsonwebtoken');

const users = [];
const secretKey = 'mykey';


// JWT token generating function
const generateToken = (data) => {
    return jwt.sign(data, secretKey, { expiresIn: '1h' });
};


const registerData = (req, res) => {
    const { userName, password, phoneNumber, email, fullName } = req.body;
    const id = randomId();
    const userExists = users.find(user => user.userName === userName);
    if (userExists) {
        return res.json({ "message": "User with that Username already exists." });
    } else {
        const newUserDetails = { id, userName, password, phoneNumber, email, fullName };
        users.push(newUserDetails);
        res.json({ newUserDetails });
    }
};

const login = (req, res) => {
    const { userName, password } = req.body;
    const userExists = users.find(user => user.userName === userName && user.password === password);
    if (userExists) {
        const token = generateToken({ id: userExists.id, userName: userExists.userName });
        res.json({ token });
    } else {
        res.json({ "message": "Invalid Credentials." });
    }
};

module.exports = { registerData, login };