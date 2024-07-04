const tasks = [];

const createTask = (req, res) => {
    const { taskName, taskDescription } = req.body;
    // console.log(req)
    const userId = req.user.id;
    // console.log(userId)
    const newTask = { userId, taskName, taskDescription };

    tasks.push(newTask);
    res.json({ newTask });
};

const getTasks = (req, res) => {
    const userId = req.user.id;
    const userTasks = tasks.filter(task => task.userId === userId);
    res.json(userTasks);
};

module.exports = { createTask, getTasks }