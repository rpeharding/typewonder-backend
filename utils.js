const getUserWithoutPassword = ({ password, ...userWithoutPassword }) => {
  return userWithoutPassword;
};

module.exports = { getUserWithoutPassword };
