const Payment = require('../models/paymentModel');
const Project = require('../models/projectModel');

const markPaymentAsPaid = async (req, res) => {
  const { id } = req.params;
  const payment = await Payment.findById(id);
  
  if (!payment) {
    res.status(404).json({ message: 'Payment not found' });
    return;
  }

  payment.status = 'Paid';
  await payment.save();
  res.json({ message: 'Payment marked as paid' });
};

// Create payment for a project
const createPayment = async (req, res) => {
  const { projectId, amount } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }

  const payment = new Payment({ projectId, amount, status: 'Pending' });
  await payment.save();

  res.status(201).json(payment);
};

// Get all payments
const getPayments = async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
};

module.exports = { markPaymentAsPaid, createPayment, getPayments };
