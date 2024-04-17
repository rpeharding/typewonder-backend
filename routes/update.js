const express = require("express");
const sha256 = require("sha256");
const { salt } = require("../secrets");
// const { users } = require("../db");
const router = express.Router();
const Joi = require("joi");
const asyncMySQL = require("../mysql/driver");
const { updateUser } = require("../mysql/queries");

//define joi schema
// const profileSchema = Joi.object({
//   firstName: Joi.string(),
//   lastName: Joi.string(),
//   location: Joi.object({
//     cityName: Joi.string(),
//     latitude: Joi.number(),
//     longitude: Joi.number(),
//   }),
//   birthdate: Joi.string(),
//   yearOfDiagnosis: Joi.number(),
//   bio: Joi.string(),
//   pastimes: Joi.array().items(Joi.string()),
//   goal: Joi.string(),
//   socialLink: Joi.string().uri(),
//   mainImage: Joi.string(),
//   profileImages: Joi.array().items(Joi.string()),
// });

router.patch("/profile/:id", async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing any data" });
  }

  if (email) {
    asyncMySQL(updateUser("email", email, req.headers.token));
  }
  if (password) {
    asyncMySQL(
      updateUser("password", sha256(password + salt), req.headers.token)
    );
  }

  res.send({ status: 1, message: "creds updated" });
});

//   const { id } = req.params;
//   // for when I try and call this endpoint in the frontend
//   if (!id) {
//     res.send({ status: 0, reason: "no id" });
//     return;
//   }

//   //validate with Joi
//   try {
//     await schema.validateAsync(req.body);
//   } catch (error) {
//     res.send({ status: 0, reason: error });
//     return;
//   }

//   //check user exists and get index of user
//   const userIndex = users.findIndex((user) => {
//     return user.id === id;
//   });

//   // if no user
//   if (userIndex === -1) {
//     res.send({ status: 0, reason: "can't find user" });
//     return;
//   }

//   // update user
//   // user at the index will be the old load of data ahout that user overwritten with the new data
//   users[userIndex] = { ...users[userIndex], ...req.body };

//   res.send({ status: 1, message: "user updated" });
// });

// router.patch("/account-details/:id", async (req, res) => {
//   const { id } = req.params;
//   //write stuff for updating email and password here
//   //validate first - write schema
//   // do ecnryption and salting
//   // update
// });

module.exports = router;
