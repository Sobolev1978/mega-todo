const Tasks = require('../models/task');

const getTasks = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const tasks = await Tasks.find({userId: _id});
    return res.status(200).json({
      message: 'Successfully created',
      tasks: tasks.map((newTask) => ({ id: newTask._id, name: newTask.name, checked: newTask.checked }))
    });
  }
  catch (e) {
    return next(e);
  }
};

module.exports = getTasks;
