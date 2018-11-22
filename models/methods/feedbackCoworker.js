const { FeedbackCoworker } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Function
const updateFeedbackCoworker = (feedbackCoworker, data) => {
  const newFeedbackCoworker = feedbackCoworker;
  if (data.content) {
    newFeedbackCoworker.content = data.content;
  }
  return newFeedbackCoworker;
};

// Static Methods
FeedbackCoworker.listFeedbackCoworker = options => new Promise(((resolve) => {
  FeedbackCoworker.sync().then(() => {
    FeedbackCoworker.findAll(options).then((feedbackCoworkers) => {
      resolve(feedbackCoworkers);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackCoworker.createFeedbackCoworker = feedbackCoworker => new Promise(((resolve) => {
  FeedbackCoworker.sync().then(() => {
    FeedbackCoworker.create({
      id: idGenerator(),
      name: feedbackCoworker.name,
    }).then((createdFeedbackCoworker) => {
      resolve(createdFeedbackCoworker);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackCoworker.readFeedbackCoworker = (feedbackCoworkerId, options) => new Promise(((resolve) => {
  FeedbackCoworker.sync().then(() => {
    FeedbackCoworker.findByPk(feedbackCoworkerId,options).then((feedbackCoworker) => {
      resolve(feedbackCoworker);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackCoworker.updateFeedbackCoworker = data => new Promise(((resolve) => {
  FeedbackCoworker.sync().then(() => {
    FeedbackCoworker.findByPk(data.id).then((feedbackCoworker) => {
      feedbackCoworker.save(updateFeedbackCoworker(feedbackCoworker, data)).then((updatedFeedbackCoworker) => {
        resolve(updatedFeedbackCoworker);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackCoworker.deleteFeedbackCoworker = feedbackCoworkerId => new Promise(((resolve) => {
  FeedbackCoworker.sync().then(() => {
    FeedbackCoworker.findByPk(feedbackCoworkerId).then((feedbackCoworker) => {
      feedbackCoworker.destroy().then((deletedFeedbackCoworker) => {
        if (deletedFeedbackCoworker && deletedFeedbackCoworker.deletedAt) {
          resolve(deletedFeedbackCoworker);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

module.exports = FeedbackCoworker;
