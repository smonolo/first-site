module.exports = {
  error: (res, error) => {
    return res.json({
      success: false,
      error
    });
  },
  invalidRequest: res => {
    return res.json({
      success: false,
      error: 'invalid request'
    });
  },
  internalError: res => {
    return res.json({
      success: false,
      error: 'internal error'
    });
  }
};