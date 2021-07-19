const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  checked: { type: Boolean, default: false },
  userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
});

module.exports = mongoose.model('Task', TaskSchema);
