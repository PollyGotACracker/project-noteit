export const getCatHandler = async () => {
  try {
    let res = await fetch("/note/cat");
    res = await res.json();
    if (res.error) {
      alert(res.error);
      return false;
    } else {
      return res.result;
    }
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

export const deleteCatHandler = async (catid) => {
  try {
    let res = await fetch(`/note/cat/delete/${catid}`, {
      method: "DELETE",
    });
    res = res.json();
    if (res.error) {
      alert(res.error);
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};

export const deleteSubHandler = async (subid) => {
  try {
    const res = await fetch(`/note/sub/delete/${subid}`, {
      method: "DELETE",
    }).then((data) => data.json());
    if (res.error) {
      alert(res.error);
      return false;
    } else {
      return res.result;
    }
  } catch (error) {
    console.log(error);
    alert("서버 연결에 문제가 발생했습니다.");
  }
};
