const Tasks = require('../models/task');

const patchTask = async (req, res, next) => {
  try {
    const { id, checked } = req.body;
    const {_id} = req.user;
    await Tasks.updateOne({ _id: id, userId: _id, }, { $set: { checked } });
    return res.status(200).json({ message: 'Task state changed' });
  }
  catch (e) {
    return next(e);
  }
};

module.exports = patchTask;
