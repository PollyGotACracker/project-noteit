export const getSearchResult = async (value) => {
  const res = await fetch(`/server/search?value=${value}`).then((data) =>
    data.json()
  );
  return { data: res.result, regexp: res.regexp };
};
