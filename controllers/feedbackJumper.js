const { FeedbackJumper } = require('../models/index');


const listFeedbackJumper = (req, res, next) => {
  FeedbackJumper.listFeedbackJumper().then((feedbackJumpers) => {
    res.status(200).json(feedbackJumpers);
  }).catch((err) => {
    next(err);
  });
};

const createFeedbackJumper = (req, res, next) => {
  FeedbackJumper.createFeedbackJumper(req.body).then((feedbackJumper) => {
    res.status(200).json(feedbackJumper);
  }).catch((err) => {
    next(err);
  });
};

const readFeedbackJumper = (req, res, next) => {
  FeedbackJumper.readFeedbackJumper(req.params.id).then((feedbackJumper) => {
    res.status(200).json(feedbackJumper);
  }).catch((err) => {
    next(err);
  });
};

const updateFeedbackJumper = (req, res, next) => {
  FeedbackJumper.updateFeedbackJumper(req.body, req.user.id).then((feedbackJumper) => {
    res.status(200).json(feedbackJumper);
  }).catch((err) => {
    next(err);
  });
};

const deleteFeedbackJumper = (req, res, next) => {
  FeedbackJumper.deleteFeedbackJumper(req.body.id).then((feedbackJumper) => {
    res.status(200).json(feedbackJumper);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listFeedbackJumper,
  createFeedbackJumper,
  readFeedbackJumper,
  updateFeedbackJumper,
  deleteFeedbackJumper,
};
