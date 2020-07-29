const { verify } = require('../auth/utils');

function notFound(req, res, next) {
  const error = new Error(`Not found : ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
    error: process.env.NODE_ENV === 'production' ? {} : error.stack,
  });
}

// 5:53:00
async function checkAuthHeaderSetUser(req, res, next) {
  const authorization = req.get('authorization');
  if (authorization) {
    const token = authorization.split(' ')[1];
    try {
      const user = await verify(token);
      req.user = user;
    } catch (error) {
      console.log(error);
    }
  }
  next();
}

async function checkAuthHeaderSetUserUnAuthorized(req, res, next) {
  const authorization = req.get('authorization');
  if (authorization) {
    const token = authorization.split(' ')[1];
    try {
      const user = await verify(token);
      req.user = user;
      return next();
    } catch (error) {
      res.status(401);
      next(new Error('Un-Authorized'));
    }
  }
  res.status(401);
  next(new Error('Un-Authorized'));
}

module.exports = {
  notFound,
  errorHandler,
  checkAuthHeaderSetUser,
  checkAuthHeaderSetUserUnAuthorized,
};
