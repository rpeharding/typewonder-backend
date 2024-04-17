const express = require("express");
const sha256 = require("sha256");
const { salt } = require("../secrets");
const router = express.Router();
const Joi = require("joi");
const asyncMySQL = require("../mysql/driver");
const { addUser, addToken, addLocation } = require("../mysql/queries");
const { getRandom } = require("../utils");

//define joi schema
// const schema = Joi.object({
//   firstName: Joi.string().required(),
//   lastName: Joi.string(),
//   location: Joi.object({
//     cityName: Joi.string().required(),
//     latitude: Joi.number().required(),
//     longitude: Joi.number().required(),
//   }),
//   birthdate: Joi.string().required(),
//   yearOfDiagnosis: Joi.number(),
//   bio: Joi.string().required(),
//   pastimes: Joi.array().items(Joi.string()).required(),
//   goal: Joi.string(),
//   socialLink: Joi.string().uri().required(),
//   mainImage: Joi.string().required(),
//   profileImages: Joi.array().items(Joi.string()),
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

router.post("/", async (req, res) => {
  console.log(req.body);
  let {
    email,
    password,
    firstName,
    lastName,
    birthdate,
    yearOfDiagnosis,
    bio,
    goal,
    socialLink,
    mainImage,
    profileImages,
    pastimes,
    location,
  } = req.body;

  const { cityName, latitude, longitude } = location;

  password = sha256(password + salt);

  try {
    const result = await asyncMySQL(
      addUser(
        email,
        password,
        firstName,
        lastName,
        birthdate,
        yearOfDiagnosis,
        bio,
        goal,
        socialLink,
        mainImage
      )
    );
    console.log(result);

    await asyncMySQL(
      addLocation(result.insertId, cityName, latitude, longitude)
    );

    for (let i = 0; i < profileImages.length; i++) {
      console.log("loop ran");
      const sql = `INSERT INTO images 
    (user_id, image)
    VALUES
    (${result.insertId}, "${profileImages[i]}");
    `;
      const innerResult = await asyncMySQL(sql);
      console.log(innerResult);
    }

    for (let i = 0; i < pastimes.length; i++) {
      console.log("loop ran");
      const sql = `INSERT INTO pastimes
    (user_id, name)
    VALUES
    (${result.insertId}, "${pastimes[i]}");
    `;
      const innerResult = await asyncMySQL(sql);
      console.log(innerResult);
    }

    const token = getRandom();
    await asyncMySQL(addToken(result.insertId, token));
    res.send({ status: 1, token });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, reason: error });
  }

  // let { email, password, ...profile } = req.body;

  // if (!email || !password) {
  //   res.send({ status: 0, reason: "Missing data" });
  // }

  // password = sha256(password + salt);

  // //login at the same time
  // const token = getRandom();

  // try {
  //   // await schema.validateAsync(req.body);
  //   const result = await asyncMySQL(addUser(email, password));
  //   await asyncMySQL(addToken(result.insertId, token));
  //   res.send({ status: 1, token });
  // } catch (error) {
  //   console.log(error);
  //   res.send({ status: 0, reason: error });
  //   return;
  // }

  //   const user = users.find((user) => {
  //     return user.email === email;
  //   });

  //   if (user) {
  //     res.send({ status: 0, reason: "duplicate account" });
  //     return;
  //   }
  //   let id = uuidv4();

  // users.push({ ...profile, email, password, id });
  // res.send({ status: 1, id });
});

module.exports = router;
