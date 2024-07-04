const express = require("express");
const { createTask, getTasks } = require("../management/taskManagement/taskManagementFunctions");
const { registerData, login } = require("../management/userManagement/userManagementFunctions");
const { taskVerify } = require('../middlewares/taskVerify');

const router = express.Router();

router.post("/register", registerData);
router.post("/login", login);
router.post("/tasks", taskVerify, createTask);
router.get("/tasks", taskVerify, getTasks);

module.exports = router;
