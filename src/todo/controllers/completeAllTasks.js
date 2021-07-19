const Tasks = require('../models/task');

const completeAllTasks = async (req, res, next) => {
  try {
    const {_id} = req.user;
    await Tasks.updateMany({ checked: false, userId: _id, }, { $set: { checked: true } });
    return res.status(200).json({ message: 'Complete everything' });
  }
  catch (e) {
    return next(e);
  }
};

module.exports = completeAllTasks;
