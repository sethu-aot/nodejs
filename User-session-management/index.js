const users = [];

const getHomePage = (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        res.redirect("/login");
    }
};

const getLoginPage = (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        const error = req.session.error || "";
        delete req.session.error;
        res.render("login", { error: error });
    }
};

const getRegisterPage = (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        const error = req.session.error || "";
        delete req.session.error;
        res.render("register", { error: error });
    }
};

const putLoginData = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.email === username);
    if (user && user.password === password) {
        req.session.user = user;
        res.redirect('/');
    } else {
        req.session.error = "Invalid username or password";
        res.redirect("/login");
    }
};

const putRegisterData = (req, res) => {
    const { email, password, fullName, phoneNumber } = req.body;
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        req.session.error = "User with that email already exists";
        res.redirect("/register");
    } else {
        const newUser = { email, password, fullName, phoneNumber };
        users.push(newUser);
        req.session.user = newUser;
        res.redirect('/');
    }
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect("/login");
    });
};

module.exports = { getHomePage, getLoginPage, getRegisterPage, putLoginData, putRegisterData, logout };
