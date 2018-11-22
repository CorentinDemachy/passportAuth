const { FeedbackJumper } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Function
const updateFeedbackJumper = (feedbackJumper, data) => {
  const newFeedbackJumper = feedbackJumper;
  if (data.content) {
    newFeedbackJumper.content = data.content;
  }
  return newFeedbackJumper;
};

// Static Methods
FeedbackJumper.listFeedbackJumper = options => new Promise(((resolve) => {
  FeedbackJumper.sync().then(() => {
    FeedbackJumper.findAlloptions().then((feedbackJumpers) => {
      resolve(feedbackJumpers);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackJumper.createFeedbackJumper = feedbackJumper => new Promise(((resolve) => {
  FeedbackJumper.sync().then(() => {
    FeedbackJumper.create({
      id: idGenerator(),
      name: feedbackJumper.name,
    }).then((createdFeedbackJumper) => {
      resolve(createdFeedbackJumper);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackJumper.readFeedbackJumper = (feedbackJumperId, options) => new Promise(((resolve) => {
  FeedbackJumper.sync().then(() => {
    FeedbackJumper.findByPk(feedbackJumperId, options).then((feedbackJumper) => {
      resolve(feedbackJumper);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackJumper.updateFeedbackJumper = data => new Promise(((resolve) => {
  FeedbackJumper.sync().then(() => {
    FeedbackJumper.findByPk(data.id).then((feedbackJumper) => {
      feedbackJumper.save(updateFeedbackJumper(feedbackJumper, data)).then((updatedFeedbackJumper) => {
        resolve(updatedFeedbackJumper);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackJumper.deleteFeedbackJumper = feedbackJumperId => new Promise(((resolve) => {
  FeedbackJumper.sync().then(() => {
    FeedbackJumper.findByPk(feedbackJumperId).then((feedbackJumper) => {
      feedbackJumper.destroy().then((deletedFeedbackJumper) => {
        if (deletedFeedbackJumper && deletedFeedbackJumper.deletedAt) {
          resolve(deletedFeedbackJumper);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

module.exports = FeedbackJumper;
