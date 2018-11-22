const { FeedbackCoworker } = require('../models/index');


const listFeedbackCoworker = (req, res, next) => {
  FeedbackCoworker.listFeedbackCoworker().then((feedbackCoworkers) => {
    res.status(200).json(feedbackCoworkers);
  }).catch((err) => {
    next(err);
  });
};

const createFeedbackCoworker = (req, res, next) => {
  FeedbackCoworker.createFeedbackCoworker(req.body).then((feedbackCoworker) => {
    res.status(200).json(feedbackCoworker);
  }).catch((err) => {
    next(err);
  });
};

const readFeedbackCoworker = (req, res, next) => {
  FeedbackCoworker.readFeedbackCoworker(req.params.id).then((feedbackCoworker) => {
    res.status(200).json(feedbackCoworker);
  }).catch((err) => {
    next(err);
  });
};

const updateFeedbackCoworker = (req, res, next) => {
  FeedbackCoworker.updateFeedbackCoworker(req.body, req.user.id).then(
    (feedbackCoworker) => {
      res.status(200).json(feedbackCoworker);
    },
  ).catch((err) => {
    next(err);
  });
};

const deleteFeedbackCoworker = (req, res, next) => {
  FeedbackCoworker.deleteFeedbackCoworker(req.body.id).then((feedbackCoworker) => {
    res.status(200).json(feedbackCoworker);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listFeedbackCoworker,
  createFeedbackCoworker,
  readFeedbackCoworker,
  updateFeedbackCoworker,
  deleteFeedbackCoworker,
};
