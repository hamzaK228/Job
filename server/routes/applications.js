const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Vacancy = require('../models/Vacancy');

// POST /api/applications - Apply for a job (Seeker)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seeker') {
      return res.status(403).json({ message: 'Only seekers can apply' });
    }
    const newApp = new Application({
      ...req.body, // vacancyId, profile, matchScore, coverLetter
      seekerId: req.user.id
    });
    const app = await newApp.save();
    res.json(app);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET /api/applications/seeker - Get my applications
router.get('/seeker', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seeker') return res.status(403).json({ message: 'Not authorized' });
    const apps = await Application.find({ seekerId: req.user.id }).populate('vacancyId').sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET /api/applications/employer - Get applicants for my vacancies
router.get('/employer', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer') return res.status(403).json({ message: 'Not authorized' });
    
    // Find all vacancies owned by this employer
    const vacancies = await Vacancy.find({ employerId: req.user.id });
    const vacancyIds = vacancies.map(v => v._id);

    // Find all applications for these vacancies
    const apps = await Application.find({ vacancyId: { $in: vacancyIds } })
      .populate('seekerId', 'name email')
      .populate('vacancyId', 'title')
      .sort({ matchScore: -1 }); // Sort by match score desc

    res.json(apps);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PATCH /api/applications/:id/status - Update status (Employer)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer') return res.status(403).json({ message: 'Not authorized' });
    
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    // Ensure employer owns the vacancy
    const vacancy = await Vacancy.findById(app.vacancyId);
    if (vacancy.employerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    app.status = req.body.status;
    await app.save();
    res.json(app);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
