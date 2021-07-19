const Tasks = require('../models/task');

const addTask = async (req, res, next) => {
  try {
    const { name, checked } = req.body;
    const {_id} = req.user;
    const newTask = new Tasks({ name, checked, userId: _id});
    await newTask.save()
    return res.status(200).json({ message: 'Successfully created', task: { id: newTask._id, name: newTask.name, checked: newTask.checked } });
  }
  catch (e) {
    return next(e);
  }
};

module.exports = addTask;
