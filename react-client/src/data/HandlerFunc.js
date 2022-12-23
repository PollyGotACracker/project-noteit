const clickWriteHandler = (e) => {
  const target = e.target;
  const catid = e.target?.dataset?.catid;
  const subid = e.target?.dataset?.subid;
  if (!subid) {
    window.location.pathname = `/voca/write/${catid}`;
  } else {
    window.location.pathname = `/voca/write/${catid}/${subid}`;
  }
};

export { clickWriteHandler };
