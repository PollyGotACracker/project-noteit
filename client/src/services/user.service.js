export const getUserData = async () => {
  const res = await fetch(`/server/user/get`).then((data) => data.json());
  if (res.error) {
    console.log(res.error);
    return false;
  }
  if (res.data) return res.data;
};

export const setUserData = async ({ userId, data }) => {
  const fetchOption = {
    method: "POST",
    body: data,
  };
  const res = await fetch(`/server/user/${userId}/profile`, fetchOption);
  return res;
};
