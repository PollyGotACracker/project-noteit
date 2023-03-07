export const getUserData = async () => {
  const res = await fetch(`user/get`).then((data) => data.json());
  return res.data;
};
