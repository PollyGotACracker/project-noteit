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

// score insert
// category quizdate update
// keywords wrongcount update
// users totalscore update
export const insertQuizScore = async (score, keyids) => {
  const catid = score.sc_catid;
  const date = score.sc_date;
  const userid = score.sc_userid;
  const userscore = score.sc_score;

  const scoFetchOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(score),
  };
  const patchFetchOption = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  };
  const scoRes = await fetch(`/quiz/score/insert`, scoFetchOption).then(
    (data) => data.json()
  );
  if (scoRes.error) {
    alert(scoRes.error);
    return false;
  }
  patchFetchOption.body = JSON.stringify({ catid, date });
  const catRes = await fetch(`/quiz/cat/update`, patchFetchOption).then(
    (data) => data.json()
  );
  if (catRes.error) {
    alert(catRes.error);
    return false;
  }
  patchFetchOption.body = JSON.stringify(keyids);
  const keyRes = await fetch(`/quiz/key/update`, patchFetchOption).then(
    (data) => data.json()
  );
  if (keyRes.error) {
    alert(keyRes.error);
    return false;
  }
  patchFetchOption.body = JSON.stringify({ userid, userscore });
  const userRes = await fetch(`/quiz/user/update`, patchFetchOption).then(
    (data) => data.json()
  );
  if (userRes.error) {
    alert(userRes.error);
    return false;
  }
  if (userRes.result) return userRes.result;
};
