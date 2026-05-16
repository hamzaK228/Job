const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  vacancyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacancy', required: true },
  seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String },
  profile: {
    age: Number,
    experience: Boolean,
    languages: Number,
    skills: [String]
  },
  matchScore: { type: Number, required: true },
  status: { type: String, enum: ['new', 'reviewed', 'interview', 'rejected'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
