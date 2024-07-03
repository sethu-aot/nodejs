const usersData = [];

//Get Home Page function
const getHomePage = (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        res.redirect("/login");
    }
};

//Get Login Page function
const getLoginPage = (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        const error = req.session.error || "";
        delete req.session.error;
        res.render("login", { error: error });
    }
};

//Get Register Page function
const getRegisterPage = (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        const error = req.session.error || "";
        delete req.session.error;
        res.render("register", { error: error });
    }
};

//Login validation function
const putLoginData = (req, res) => {
    const { username, password } = req.body;
    const user = usersData.find(user => user.email === username);
    if (user && user.password === password) {
        req.session.user = user;
        res.redirect('/');
    } else {
        req.session.error = "Invalid username or password";
        res.redirect("/login");
    }
};

//User registration function
const putRegisterData = (req, res) => {
    const { email, password, fullName, phoneNumber } = req.body;
    const userExists = usersData.find(user => user.email === email);
    if (userExists) {
        req.session.error = "User with that email already exists. Please register with nother email";
        res.redirect("/register");
    } else {
        const newUserDetails = { email, password, fullName, phoneNumber };
        usersData.push(newUserDetails);
        req.session.user = newUserDetails;
        res.redirect('/');
    }
};

//Logout Function
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect("/login");
    });
};

// //Old login function
// const logout = (req, res) => {
//     req.session.user = null;
//     res.redirect('/login')
// }

module.exports = { getHomePage, getLoginPage, getRegisterPage, putLoginData, putRegisterData, logout };
