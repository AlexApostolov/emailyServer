module.exports = (req, res, next) => {
  // Terminate incoming request if user's credits are 0 or negative number
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!' });
  }
  // Otherwise, go on to next middleware in the chain or the route handler itself
  next();
};
