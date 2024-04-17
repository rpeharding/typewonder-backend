const express = require("express");
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { users } = require("../db");
const router = express.Router();
const { getRandom } = require("../utils");
const asyncMySQL = require("../mysql/driver");

router.post("/", async (req, res) => {
  let { email, password } = req.body;
  password = sha256(password + salt);

  const results = await asyncMySQL(`SELECT * FROM users
                                       WHERE email LIKE "${email}" 
                                         AND password LIKE "${password}";`);

  if (results.length > 0) {
    const token = getRandom();

    await asyncMySQL(`INSERT INTO sessions
    (user_id, token)
       VALUES
         (${results[0].id}, "${token}");`);

    res.send({ status: 1, token });
    return;
  }

  res.send({ status: 0, reason: "Bad credentials" });

  // const user = users.find((user) => {
  //   return (
  //     user.email === req.body.email &&
  //     user.password === sha256(req.body.password + salt)
  //   );
  // });

  // if (!user) {
  //   res.send({
  //     status: 0,
  //     reason: "username and password combination not found",
  //   });
  //   return;
  // }

  // const token = getRandom();
  // user.token = token
  //   ? user.token.push({ token, issueDate: Date.now() })
  //   : (user.token = [{ token, issueDate: Date.now() }]);
});

module.exports = router;
