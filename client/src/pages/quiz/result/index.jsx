import "@styles/quiz/result.css";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useMutation } from "react-query";
import { BsArrowRepeat } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { getClient } from "@services/core";
import getTodayFormat from "@utils/getTodayFormat";
import { insertScore, updateUserNote } from "@services/quiz.service";
import { URLS } from "@/router";
import ResultWrongs from "@components/quiz/resultWrongs";

const QuizResultPage = () => {
  const location = useLocation();
  const queryClient = getClient();
  const [saveMsg, setSaveMsg] = useState("");

  if (!location?.state)
    return (
      <main className="Quiz">
        <p style={{ textAlign: "center" }}>잘못된 접근입니다.</p>
      </main>
    );

  const { wrongs, score } = location.state;
  const { dateStr, timeStr } = getTodayFormat(score.sc_date, score.sc_time);
  const ratio = score.sc_score / score.sc_totalscore;

  const {
    mutate: saveMutation,
    isSuccess,
    error: insertScoreError,
  } = useMutation(insertScore({ score }));
  const {
    mutate: saveUserMutation,
    data: updateScoreSuccess,
    error: updatScoreError,
  } = useMutation(updateUserNote({ queryClient, score }));

  useEffect(() => {
    if (isSuccess) {
      const keyids = wrongs
        .map((sub) => sub.wrong.map((key) => key.k_keyid))
        .flat(2);
      saveUserMutation({ keyids });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (insertScoreError) setSaveMsg(insertScoreError.message);
  }, [insertScoreError]);

  useEffect(() => {
    if (updateScoreSuccess) setSaveMsg(updateScoreSuccess.message);
  }, [updateScoreSuccess]);

  useEffect(() => {
    if (updatScoreError) setSaveMsg(updatScoreError.message);
  }, [updatScoreError]);

  const saveQuizResult = () => {
    setSaveMsg("기록을 저장 중입니다...");
    saveMutation();
  };

  return (
    <main className="Quiz">
      <section className="Result">
        <div className="score">
          {score.sc_score} / {score.sc_totalscore}
        </div>
        <div className="duration">{score.sc_duration}</div>
        <div className="feedback">
          {ratio === 1
            ? "정말 최고예요!"
            : ratio >= 0.6
            ? "잘했어요!"
            : ratio >= 0.4
            ? "괜찮아요!"
            : "다시 공부해보세요!"}
        </div>
        <div className="date">{dateStr}</div>
        <div className="time">{timeStr}</div>
        <div className="btn-box">
          <div className="save-msg">{saveMsg}</div>
          <button className="save" type="button" onClick={saveQuizResult}>
            <FaRegSave />
            기록 저장
          </button>
          <Link className="restart" to={`${URLS.QUIZ_GAME}/${score.sc_catid}`}>
            <BsArrowRepeat />
            다시 풀기
          </Link>
        </div>
        <ResultWrongs wrongs={wrongs} />
      </section>
    </main>
  );
};

export default QuizResultPage;
