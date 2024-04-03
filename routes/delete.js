const express = require("express");
const { users } = require("../db");
const router = express.Router();

// delete user for given id
router.delete("/:id", (req, res) => {
  let { id } = req.params;

  const userIndex = users.findIndex((user) => {
    return user.id === id;
  });

  if (userIndex === -1) {
    res.send({ status: 0, reason: "user not found" });
    return;
  }

  //remove user
  users.splice(userIndex, 1);

  //return the user
  res.send({ status: 1, message: "user deleted" });
});

module.exports = router;
