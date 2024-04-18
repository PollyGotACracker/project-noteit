export const getQuizTimer = () => {
  return Number(localStorage.getItem("quiz-timer")) || 0;
};

export const setQuizTimer = (num) => {
  const value = Number(num) || 0;
  localStorage.setItem("quiz-timer", value);
};
