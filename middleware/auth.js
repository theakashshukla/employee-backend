const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};
const isManager = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'manager') {
    return next();
  }
  res.status(401).json({ error: "Forbidden" });
};
const isEmployee = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'employee') {
    return next();
  }
  res.status(401).json({ error: "Forbidden" });
};

module.exports = { isLoggedIn, isManager, isEmployee };
