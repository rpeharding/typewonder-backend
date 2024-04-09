const getUserWithoutPassword = ({ password, ...userWithoutPassword }) => {
  return userWithoutPassword;
};

const getRandom = () => {
  return Math.floor(Math.random() * 100000000000000000);
};

module.exports = { getUserWithoutPassword, getRandom };
