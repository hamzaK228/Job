const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema({
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  title: { type: String, required: true },
  format: { type: String, required: true },
  salaryRange: { type: String, required: true },
  vacancyRate: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vacancy', VacancySchema);
