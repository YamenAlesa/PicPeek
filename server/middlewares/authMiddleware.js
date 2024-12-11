module.exports = (req, res, next) => {
  const user = true;
  if (user) {
    console.log("user is authenticated");
    next();
  } else {
    console.log("user is not authenticated");
  }
};
