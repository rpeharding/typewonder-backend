const express = require("express");
const { users } = require("../db");
const router = express.Router();
const { getUserWithoutPassword } = require("../utils");

// this gets all users as array without the password
router.get("/", (req, res) => {
  res.send(users.map(getUserWithoutPassword));
});

// the :/id comes from the params.
router.get("/:id", (req, res) => {
  let { id } = req.params;

  const user = users.find((user) => {
    return user.id === id;
  });

  if (!user) {
    res.send({ status: 0, reason: "user not found, check ID" });
    return;
  }

  //return the user
  res.send({ status: 1, user: getUserWithoutPassword(user) });
});

module.exports = router;
