const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Vacancy = require('../models/Vacancy');
const User = require('../models/User');

// GET /api/vacancies - Get all vacancies (public or seeker)
router.get('/', async (req, res) => {
  try {
    const vacancies = await Vacancy.find().sort({ createdAt: -1 });
    res.json(vacancies);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST /api/vacancies - Create new vacancy (Employer only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const user = await User.findById(req.user.id);
    const newVacancy = new Vacancy({
      ...req.body,
      employerId: req.user.id,
      company: user.name // or get from request body if multiple companies per user
    });

    const vacancy = await newVacancy.save();
    res.json(vacancy);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
