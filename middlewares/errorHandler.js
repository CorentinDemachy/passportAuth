const errorHandler = require('errorhandler');

const appErrorHandler = (app) => {
  if (process.env.NODE_ENV === 'dev') {
    app.use(errorHandler());
  }
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(err.code || 500).json({
      error: {
        status: err.code || 500,
        message: err.message,
      },
    });
  });
};

module.exports = appErrorHandler;
