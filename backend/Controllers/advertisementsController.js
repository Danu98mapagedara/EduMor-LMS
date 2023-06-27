const Advertisements = require("../models/Advertisement");

exports.saveAdvertisement = (req, res) => {
  const newAdvertisement = new Advertisements(req.body);
  newAdvertisement.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Advertisement saved successfully",
    });
  });
};

exports.getAdvertisements = (req, res) => {
  Advertisements.find().exec((err, advertisements) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingAds: advertisements,
    });
  });
};

exports.updateAdvertisement = (req, res) => {
  Advertisements.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Advertisement updated successfully",
      });
    }
  );
};

exports.deleteAdvertisement = (req, res) => {
  Advertisements.findByIdAndRemove(req.params.id).exec(
    (err, deletedDetails) => {
      if (err) {
        return res.status(400).json({
          message: "Delete unsuccessful",
          err,
        });
      }
      return res.json({
        message: "Delete successful",
        deletedDetails,
      });
    }
  );
};
