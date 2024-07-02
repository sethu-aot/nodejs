const { v4: randomUuid } = require('uuid');

const datas = [];

const getTasks = (req, res) => {
    res.json(datas);
}

const getOneTask = (req, res) => {
    const id = req.params.id;
    console.log(id)
    
    const tasks = datas.find(task => task.id == id);
    console.log(tasks)
    if (!tasks) {
        return res.status(404).json({ error: "No task found with that ID" });
    }
    res.json(tasks);
}

const createOneTask = (req, res) => {
    const { taskTitle, taskDescription } = req.body;
    const id = randomUuid();

    if (!id || !taskTitle || !taskDescription) {
        return res.status(400).json({ error: "Invalid input: Id/Title/Description is absent" });
    }

    const existingTask = datas.find(task => task.id === id);
    if (existingTask) {
        return res.status(409).json({ error: "Task with this ID already exists" });
    }

    datas.push({id, taskTitle, taskDescription});
    res.json(datas);
}

const updateTask = (req, res) => {
    const id = req.params.id;

    const { taskTitle, taskDescription } = req.body;
    const tasks = datas.find(task => task.id == id);

    if (!tasks) {
        return res.status(404).json({ error: "No task found with that ID" });
    }
    tasks.taskTitle = taskTitle;
    tasks.taskDescription = taskDescription;
    res.json(tasks);
}

const deleteTask = (req, res) => {
    const id = req.params.id;

    const taskIndex = datas.findIndex(task => task.id == id);
    if(taskIndex === -1) {
        return res.status(404).json({ error: "No task found with that ID" });
    }
    
    const tasks = datas.filter(task => task.id != id);
    res.json(tasks);
    
}

module.exports={getTasks, getOneTask, createOneTask, updateTask, deleteTask}
