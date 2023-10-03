import userMsg from "@data/userMsg";

const checkValidation = (target) => {
  const { email, password } = target;
  const removeSpace = (value) => value.replaceAll(" ", "");

  for (let input of [email, password]) {
    const value = removeSpace(input.value);
    if (!value) {
      alert(`${input.placeholder} 란을 입력해주세요.`);
      input.focus();
      return false;
    }
  }
  if (removeSpace(password.value).length < 8) {
    alert(userMsg.SHORT_PASSWORD);
    password.focus();
    return false;
  }

  return true;
};

export default checkValidation;
