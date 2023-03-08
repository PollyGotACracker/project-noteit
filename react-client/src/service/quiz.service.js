export const getQuizCat = async () => {
  try {
    const res = await fetch(`/quiz/cat/get`).then((data) => data.json());
    if (res?.error) return alert(res.error);
    if (res?.data) return res.data;
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

export const getQuizSub = async (catid) => {
  try {
    let res = await fetch(`/quiz/${catid}/rndsub/get`).then((data) =>
      data.json()
    );
    if (res?.error) return alert(res.error);
    if (res?.data) {
      // subject randomize
      const length = res.data.length;
      const iterVal = (length - 1) * 5; // 배열 크기의 4 ~ 5배
      let _subData = [...res.data];
      let i = 0;
      while (i < iterVal) {
        const _i = Math.floor(Math.random() * length);
        const _j = Math.floor(Math.random() * length);
        [_subData[_j], _subData[_i]] = [_subData[_i], _subData[_j]];
        _subData = [..._subData];
        i++;
      }
      return _subData;
    }
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};
