const { FeedbackCompany } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Function
const updateFeedbackCompany = (feedbackCompany, data) => {
  const newFeedbackCompany = feedbackCompany;
  if (data.content) {
    newFeedbackCompany.content = data.content;
  }
  return newFeedbackCompany;
};

// Static Methods
FeedbackCompany.listFeedbackCompany = options => new Promise(((resolve) => {
  FeedbackCompany.sync().then(() => {
    FeedbackCompany.findAll(options).then((feedbackCompanys) => {
      resolve(feedbackCompanys);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackCompany.createFeedbackCompany = feedbackCompany => new Promise(((resolve) => {
  FeedbackCompany.sync().then(() => {
    FeedbackCompany.create({
      id: idGenerator(),
      name: feedbackCompany.name,
    }).then((createdFeedbackCompany) => {
      resolve(createdFeedbackCompany);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackCompany.readFeedbackCompany = (feedbackCompanyId, options) => new Promise(((resolve) => {
  FeedbackCompany.sync().then(() => {
    FeedbackCompany.findByPk(feedbackCompanyId, options).then((feedbackCompany) => {
      resolve(feedbackCompany);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackCompany.updateFeedbackCompany = data => new Promise(((resolve) => {
  FeedbackCompany.sync().then(() => {
    FeedbackCompany.findByPk(data.id).then((feedbackCompany) => {
      feedbackCompany.save(updateFeedbackCompany(feedbackCompany, data)).then((updatedFeedbackCompany) => {
        resolve(updatedFeedbackCompany);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

FeedbackCompany.deleteFeedbackCompany = feedbackCompanyId => new Promise(((resolve) => {
  FeedbackCompany.sync().then(() => {
    FeedbackCompany.findByPk(feedbackCompanyId).then((feedbackCompany) => {
      feedbackCompany.destroy().then((deletedFeedbackCompany) => {
        if (deletedFeedbackCompany && deletedFeedbackCompany.deletedAt) {
          resolve(deletedFeedbackCompany);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

module.exports = FeedbackCompany;
