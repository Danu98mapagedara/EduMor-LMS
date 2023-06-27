const Vacancies = require('../models/Vacancy');

// Save vacancies details
exports.saveVacancy = (req, res) => {
  const newVacancy = new Vacancies(req.body);
  newVacancy.save((err => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: "Vacancy save Succesfully"
    });
  }));
};

// Get all vacancies details
exports.getVacancies = (req, res) => {
  Vacancies.find().exec((err, vacancies) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      existingVacancies: vacancies
    });
  });
};

// Update vacancies details
exports.updateVacancy = (req, res) => {
  Vacancies.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (err, post) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: "Updated Succesfully"
    });
  });
};

// Delete vacancies details
exports.deleteVacancy = (req, res) => {
  Vacancies.findByIdAndRemove(req.params.id).exec((err, deletedDetails) => {
    if (err) {
      return res.status(400).json({
        message: "Deleted unsuccesfull", err
      });
    }
    return res.json({
      message: "Delete succesfull", deletedDetails
    });
  });
};
