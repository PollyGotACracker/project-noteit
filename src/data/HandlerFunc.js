const clickWriteHandler = (e) => {
  const target = e.target;
  if (target?.dataset?.id) {
    window.location.pathname = `/write/${target.dataset.id}`;
  } else {
    window.location.pathname = "/write";
  }
};

export { clickWriteHandler };
