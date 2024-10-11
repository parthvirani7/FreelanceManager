const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  amount: Number,
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Payment', paymentSchema);
