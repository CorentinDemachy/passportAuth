const { FeedbackCompany } = require('../models/index');


const listFeedbackCompany = (req, res, next) => {
  FeedbackCompany.listFeedbackCompany().then((feedbackCompanies) => {
    res.status(200).json(feedbackCompanies);
  }).catch((err) => {
    next(err);
  });
};

const createFeedbackCompany = (req, res, next) => {
  FeedbackCompany.createFeedbackCompany(req.body).then((feedbackCompany) => {
    res.status(200).json(feedbackCompany);
  }).catch((err) => {
    next(err);
  });
};

const readFeedbackCompany = (req, res, next) => {
  FeedbackCompany.readFeedbackCompany(req.params.id).then((feedbackCompany) => {
    res.status(200).json(feedbackCompany);
  }).catch((err) => {
    next(err);
  });
};

const updateFeedbackCompany = (req, res, next) => {
  FeedbackCompany.updateFeedbackCompany(req.body, req.user.id).then((feedbackCompany) => {
    res.status(200).json(feedbackCompany);
  }).catch((err) => {
    next(err);
  });
};

const deleteFeedbackCompany = (req, res, next) => {
  FeedbackCompany.deleteFeedbackCompany(req.body.id).then((feedbackCompany) => {
    res.status(200).json(feedbackCompany);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listFeedbackCompany,
  createFeedbackCompany,
  readFeedbackCompany,
  updateFeedbackCompany,
  deleteFeedbackCompany,
};
