const express = require('express');
const router = express.Router();

const {getTasks, getOneTask, createOneTask, updateTask, deleteTask} = require('./crud');

router.get("/", getTasks);
router.get("/:id", getOneTask);
router.post("/", createOneTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask)

module.exports = router;