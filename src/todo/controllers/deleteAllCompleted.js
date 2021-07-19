const Tasks = require('../models/task');

const deleteAllCompleted = async (req, res, next) => {
  try {
    const {_id} = req.user;
    await Tasks.deleteMany({ checked: true, userId: _id, });
    return res.status(200).json({ message: 'Removed everything' });
  }
  catch (e) {
    return next(e);
  }
};

module.exports = deleteAllCompleted;
