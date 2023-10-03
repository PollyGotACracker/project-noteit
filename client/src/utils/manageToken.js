export const setToken = (token) => {
  localStorage.setItem("ACCESS_TOKEN", token);
};

export const getToken = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  return token;
};

export const removeToken = () => {
  localStorage.removeItem("ACCESS_TOKEN");
};
