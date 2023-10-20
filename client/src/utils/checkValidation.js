import userMsg from "@data/userMsg";

const checkValidation = (target) => {
  const removeSpace = (value) => value.replaceAll(" ", "");
  const inputs = target?.elements || target;
  for (let ele of inputs) {
    if (ele.tagName !== "INPUT") continue;
    const value = removeSpace(ele.value);
    if (!value) {
      alert(`${ele.placeholder} 란을 입력해주세요.`);
      ele.focus();
      return false;
    }
    if (ele.value.includes(" ")) {
      alert(`${ele.placeholder} 란의 공백을 제거하고 다시 입력해주세요.`);
      ele.focus();
      return false;
    }
    const isPassword = ele.type === "password";
    if (isPassword && ele.value.length < 8) {
      alert(userMsg.SHORT_PASSWORD);
      ele.focus();
      return false;
    }
  }
  return true;
};

export default checkValidation;
