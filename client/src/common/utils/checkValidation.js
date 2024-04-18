import accountMessage from "@constants/accountMessage";

const checkValidation = (target) => {
  const removeSpace = (value) => value.replaceAll(" ", "");
  const inputs = target?.elements || target;
  for (let ele of inputs) {
    if (ele.tagName !== "INPUT") continue;
    const value = removeSpace(ele.value);
    if (ele.value.includes(" ")) {
      ele.focus();
      throw new Error(
        `${ele.placeholder} 란의 공백을 제거하고 다시 입력해주세요.`
      );
    }
    if (!value) {
      ele.focus();
      throw new Error(`${ele.placeholder} 란을 입력해주세요.`);
    }
    const isPassword = ele.type === "password";
    if (isPassword && ele.value.length < 8) {
      ele.focus();
      throw new Error(accountMessage.SHORT_PASSWORD);
    }
  }
  return true;
};

export default checkValidation;
