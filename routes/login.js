const express = require("express");
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { users } = require("../db");
const router = express.Router();
const { getRandom } = require("../utils");

router.post("/", (req, res) => {
  const user = users.find((user) => {
    return (
      user.email === req.body.email &&
      user.password === sha256(req.body.password + salt)
    );
  });

  if (!user) {
    res.send({
      status: 0,
      reason: "username and password combination not found",
    });
    return;
  }

  const token = getRandom();
  user.token = token
    ? user.token.push({ token, issueDate: Date.now() })
    : (user.token = [{ token, issueDate: Date.now() }]);
  res.send({ status: 1, token });
});

module.exports = router;
