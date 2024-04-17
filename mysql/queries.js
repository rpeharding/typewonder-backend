function addUser(
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
) {
  return `INSERT INTO users
  (email, password, first_name, last_name, birth_date, year_of_diagnosis, bio, goal, social_link, main_image )
  VALUES 
  ("${email}","${password}","${firstName}","${lastName}","${birthdate}","${yearOfDiagnosis}","${bio}","${goal}","${socialLink}","${mainImage}")`;
}

function addLocation(cityName, latitude, longitude) {
  return `INSERT INTO location
  (user_id, city_name, latitude, longitude )
  VALUES 
  (${result.insertId},"${cityName}","${latitude}","${longitude}")`;
}

function addToken(userID, token) {
  return `INSERT INTO sessions
      (user_id, token)
      VALUES 
      ("${userID}","${token}")`;
}

function deleteToken(token) {
  s;
  return `DELETE FROM sessions
                      WHERE token LIKE "${token}";`;
}

function deleteUser(token) {
  return `DELETE users, sessions FROM users
                  JOIN sessions ON users.id = sessions.user_id
                      WHERE token LIKE "${token}"`;
}

function updateUser(key, value, token) {
  return `UPDATE users
                  JOIN sessions ON users.id = sessions.user_id
                      SET ${key} = "${value}"
                          WHERE sessions.token LIKE "${token}";`;
}

function checkToken(token) {
  return `SELECT users.id
                  FROM users
                      JOIN sessions ON users.id = sessions.user_id
                          WHERE token LIKE "${token}";`;
}

function getUser(token) {
  return `SELECT *
              FROM users
                  JOIN sessions ON users.id = sessions.user_id
                      WHERE token LIKE "${token}";`;
}

function addFriends() {}
function addLocation() {}
function addPastimes() {}
function addImages() {}

module.exports = {
  addUser,
  addToken,
  deleteToken,
  deleteUser,
  updateUser,
  checkToken,
  getUser,
  addLocation,
};
