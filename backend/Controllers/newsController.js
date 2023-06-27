const News = require('../models/News');

exports.saveNews = (req, res) => {
    let newNews = new News(req.body);
    newNews.save((err => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "News saved successfully"
        });
    }));
};

exports.getNews = (req, res) => {
    News.find().exec((err, news) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingNews: news
        });
    });
};

exports.updateNews = (req, res) => {
    News.findByIdAndUpdate(
        req.params.id, {
            $set: req.body
        },
        (err, post) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            return res.status(200).json({
                success: "Updated Successfully"
            });
        }
    );
};

exports.deleteNews = (req, res) => {
    News.findByIdAndRemove(req.params.id).exec((err, deletedDetails) => {
        if (err) {
            return res.status(400).json({
                message: "Deletion unsuccessful", err
            });
        }
        return res.json({
            message: "Deletion successful", deletedDetails
        });
    });
};
