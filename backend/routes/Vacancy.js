const express = require("express");
const router = express.Router();
const VacanciesController = require('../Controllers/VacanciesController');
const authMiddleware = require('../Middlewares/authMiddleware');

// Save vacancies details
router.post('/save', VacanciesController.saveVacancy);

// Get all vacancies details
router.get('/',authMiddleware, VacanciesController.getVacancies);

// Update vacancies details
router.put('/update/:id', VacanciesController.updateVacancy);

// Delete vacancies details
router.delete('/delete/:id', VacanciesController.deleteVacancy);

module.exports = router;
