const errorHandler = (
  res,
  error,
  errorCode,
  action = 'complete the action'
) => {
  return res.status(errorCode).json({
    message: `An error ocurred while trying to ${action}. Try again`,
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  })
}

module.exports = errorHandler
