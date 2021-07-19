const Tasks = require('../models/task');

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.body;
    const {_id} = req.user;
    await Tasks.deleteOne({ _id: id, userId: _id, });
    return res.status(200).json({ message: 'Successfully removed' });
  }
  catch (e) {
    return next(e);
  }
};

module.exports = deleteTask;
