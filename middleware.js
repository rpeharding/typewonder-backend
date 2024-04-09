const checkToken = (req, res, next) => {
  const user = req.users.find((user) => {
    return user.token === Number(req.headers.token);
  });

  if (user) {
    next();
    return;
  }

  res.send({ status: 0, reason: "bad token" });
};

modeule.exports = checkToken;
