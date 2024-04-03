const express = require("express");
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { v4: uuidv4 } = require("uuid");
const { users } = require("../db");
const router = express.Router();
const Joi = require("joi");

//define joi schema
const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  location: Joi.object({
    cityName: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }),
  birthdate: Joi.string().required(),
  yearOfDiagnosis: Joi.number(),
  bio: Joi.string().required(),
  pastimes: Joi.array().items(Joi.string()).required(),
  goal: Joi.string(),
  socialLink: Joi.string().uri().required(),
  mainImage: Joi.string().required(),
  profileImages: Joi.array().items(Joi.string()),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post("/", async (req, res) => {
  //validate with Joi
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    res.send({ status: 0, reason: error });
    return;
  }

  let { email, password, ...profile } = req.body;

  const user = users.find((user) => {
    return user.email === email;
  });

  if (user) {
    res.send({ status: 0, reason: "duplicate account" });
    return;
  }
  let id = uuidv4();
  password = sha256(password + salt);

  users.push({ ...profile, email, password, id });
  res.send({ status: 1, id });
});

module.exports = router;
