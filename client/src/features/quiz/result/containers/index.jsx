import style from "./page.module.css";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { BsArrowRepeat } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { userInfoFlagState } from "@recoils/user";
import getTodayFormat from "@utils/getTodayFormat";
import useResultFetcher from "../services/useResultFetcher";
import { URLS } from "@/router";
import Item from "../components/Item";
import WrongApproach from "@components/error/WrongApproach";

export default function QuizResult() {
  const { insertScore, updateUserNote } = useResultFetcher();
  const location = useLocation();
  if (!location?.state) return <WrongApproach />;

  const { wrongs, score } = location.state;
  const { dateStr, timeStr } = getTodayFormat(score.sc_date, score.sc_time);
  const ratio = score.sc_score / score.sc_totalscore;
  const [saveMsg, setSaveMsg] = useState("");
  const setUserInfoFlag = useSetRecoilState(userInfoFlagState);

  const { mutate: saveMutation, isSuccess } = useMutation(
    insertScore({
      score,
      queries: {
        onError: (error) => {
          setSaveMsg(error.message);
        },
      },
    })
  );
  const { mutate: saveUserMutation } = useMutation(
    updateUserNote({
      score,
      queries: {
        onSuccess: (data) => {
          setSaveMsg(data.message);
          setUserInfoFlag(true);
        },
        onError: (error) => {
          setSaveMsg(error.message);
        },
      },
    })
  );

  useEffect(() => {
    if (isSuccess) {
      const keyids = wrongs
        .map((sub) => sub.wrong.map((key) => key.k_keyid))
        .flat(2);
      saveUserMutation({ keyids });
    }
  }, [isSuccess]);

  const handleSaveResult = () => {
    setSaveMsg("기록을 저장 중입니다...");
    saveMutation();
  };

  return (
    <main>
      <p className={style.score}>
        {score.sc_score} / {score.sc_totalscore}
      </p>
      <p className={style.duration}>{score.sc_duration}</p>
      <p className={style.feedback}>
        {ratio === 1
          ? "정말 최고예요!"
          : ratio >= 0.6
          ? "잘했어요!"
          : ratio >= 0.4
          ? "괜찮아요!"
          : "다시 공부해보세요!"}
      </p>
      <p className={style.date}>{dateStr}</p>
      <p className={style.time}>{timeStr}</p>
      <div className={style.button_box}>
        <p className={style.save_message}>{saveMsg}</p>
        <button className={style.save} type="button" onClick={handleSaveResult}>
          <FaRegSave />
          <span>기록 저장</span>
        </button>
        <Link
          className={style.restart}
          to={`${URLS.QUIZ_GAME}/${score.sc_catid}`}
        >
          <BsArrowRepeat />
          다시 풀기
        </Link>
      </div>
      <div className={style.list}>
        <h3 className={style.list_title}>틀린 문제 목록</h3>
        {wrongs.map((item) => (
          <Item key={item?.s_subid} item={item} />
        ))}
      </div>
    </main>
  );
}
