// 모든 cat select
export const getCatHandler = async () => {
  try {
    const res = await fetch("/note/cat").then((data) => data.json());
    if (res?.error) return alert(res.error);
    if (res?.result) return res.result;
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

// cat delete
export const deleteCatHandler = async (catid) => {
  try {
    const res = await fetch(`/note/cat/${catid}/delete`, {
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
    const res = await fetch(`/note/cat/${catid}`).then((data) => data.json());
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
    const res = await fetch(`/note/sub/${catid}/${subid}/delete`, {
      method: "DELETE",
    }).then((data) => data.json());
    if (res?.error) return alert(res.error);
    if (res?.result) return res.result;
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

// detail select
export const getSubDetailHandler = async (subid) => {
  try {
    const res = await fetch(`/note/sub/${subid}`).then((data) => data.json());
    if (res?.error) return alert(res.error);
    else return { data: res.subject[0], keys: res.keywords };
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};
