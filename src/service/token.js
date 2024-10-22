const getCurrentUserAndToken = () => {
  const user = localStorage.getItem("user-access-token");
  if (!user) return null;
  return JSON.parse(user);
};

const setUserAndToken = (data) => {
  localStorage.setItem("user-access-token", JSON.stringify(data));
};

const removeUserAndToken = () => {
  localStorage.removeItem("user-access-token");
};

export { getCurrentUserAndToken, setUserAndToken, removeUserAndToken };
