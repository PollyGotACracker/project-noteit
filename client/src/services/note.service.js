// 모든 cat select
export const getCatHandler = async () => {
  try {
    const res = await fetch("/server/note/cat").then((data) => data.json());
    if (res?.error) return alert(res.error);
    if (res?.result) return res.result;
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

export const insertCat = async (catName) => {
  try {
    const fetchOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(catName),
    };
    let res = await fetch("/server/note/cat/insert", fetchOption);
    res = await res.json();
    return res;
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

export const updateCat = async ({ catId, category }) => {
  const fetchOption = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ c_catid: catId, c_category: category }),
  };
  const res = await fetch(`/server/note/cat/update`, fetchOption).then((data) =>
    data.json()
  );
  return res;
};

export const updateCatBookmark = async (catId, bookmark) => {
  const fetchOption = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // router 에서 catId로 수정 필요?
      catid: catId,
      bookmark: bookmark,
    }),
  };
  const res = await fetch(`/server/note/cat/bookmark`, fetchOption).then(
    (data) => data.json()
  );
  return res;
};

// cat delete
export const deleteCatHandler = async (catid) => {
  try {
    const res = await fetch(`/server/note/cat/${catid}/delete`, {
      method: "DELETE",
    }).then((data) => data.json());
    if (res?.error) return alert(res.error);
    if (res?.result) return alert(res.result);
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

// 모든 sub select
export const getSubHandler = async (catid) => {
  try {
    const res = await fetch(`/server/note/cat/${catid}`).then((data) =>
      data.json()
    );
    if (res?.error) {
      return alert(res.error);
    } else {
      const cat = res.category[0];
      const sub = res.subList;
      return { cat, sub };
    }
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

// sub delete
export const deleteSubHandler = async (catid, subid) => {
  try {
    const res = await fetch(`/server/note/sub/${catid}/${subid}/delete`, {
      method: "DELETE",
    }).then((data) => data.json());
    if (res?.error) return alert(res.error);
    if (res?.result) return res.result;
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

export const getSubWriteData = async (catId) => {
  try {
    let res = await fetch(`/server/note/cat/write/${catId}`).then((data) =>
      data.json()
    );
    return res;
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

// detail select
export const getSubDetailHandler = async (subid) => {
  try {
    const res = await fetch(`/server/note/sub/${subid}`).then((data) =>
      data.json()
    );

    if (res?.error) return alert(res.error);
    else return { data: res.subject[0], keys: res.keywords };
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

export const updateNote = async ({ request, subjects, keywords }) => {
  try {
    let method = "POST";
    let url = `/server/note/sub/insert`;

    if (request === "update") {
      method = "PATCH";
      url = `/server/note/sub/update`;
    }

    const fetchOption = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjects, keywords }),
    };

    let res = await fetch(url, fetchOption).then((data) => data.json());
    return res.result;
  } catch (error) {
    console.log(error);
    alert("서버에 문제가 발생했습니다.\n다시 시도해주세요.");
  }
};

export const updateSubBookmark = async (subId) => {
  try {
    let res = await fetch(`/server/note/sub/bookmark/${subId}`, {
      method: "PATCH",
    });
    res = await res.json();
    if (res?.error) return res;
    else return res.result;
  } catch (error) {
    console.log(error);
    alert("서버 접속 중 오류가 발생했습니다.");
  }
};
