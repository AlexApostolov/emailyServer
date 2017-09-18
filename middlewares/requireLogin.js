module.exports = (req, res, next) => {
  // Terminate incoming request if user not logged in
  if (!req.user) {
    return res.status(403).send({ error: 'You must log in!' });
  }
  // Otherwise if user, go on to next middleware in the chain or the route handler itself
  next();
};
