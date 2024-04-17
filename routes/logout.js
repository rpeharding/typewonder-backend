const express = require("express");
const { checkToken, checkIsUser } = require("../middleware");
const asyncMySQL = require("../mysql/driver");
const router = express.Router();

router.delete("/", checkIsUser, async (req, res) => {
  await asyncMySQL(deleteToken(req.headers.token));

  res.send({ status: 1 });

  // req.authedUser.token.splice(
  //   req.authedUser.token.indexOf(req.headers.token),
  //   1
  // );
});

module.exports = router;
