const randomizeData = (data) => {
  const length = data.length;
  const iteration = (length - 1) * 5; // 배열 크기의 4 ~ 5배
  let i = 0;
  while (i < iteration) {
    const _i = Math.floor(Math.random() * length);
    const _j = Math.floor(Math.random() * length);
    [data[_j], data[_i]] = [data[_i], data[_j]];
    i++;
  }
  return data;
};

export default randomizeData;
