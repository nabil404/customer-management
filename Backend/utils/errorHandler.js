//Function for creating new error with status and statusCode, Returns new Error
exports.sendError = (message, status, statusCode) => {
  const err = new Error(message);
  err.status = status;
  err.statusCode = statusCode;

  return err;
};
