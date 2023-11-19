import { useEffect, useState, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { HiMiniBellAlert, HiMiniBellSlash } from "react-icons/hi2";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@recoils/user";
import useNotificationFetcher from "@services/useNotificationFetcher";
import { checkSubscription } from "@utils/checkNotification";
import urlBase64ToUint8Array from "@utils/urlBase64ToUint8Array";
import SettingBox from "@components/settings/wrapper";

const PushNotification = () => {
  const userData = useRecoilValue(userState);
  const defaultHour = 18;
  const currentHour = useRef(defaultHour);
  const [canPush, setCanPush] = useState(true);
  const [pushState, setPushState] = useState(false);
  const [hour, setHour] = useState(defaultHour);
  const [stateMsg, setstateMsg] = useState("");
  const { getSubscription, setSubscription, deleteSubscription } =
    useNotificationFetcher();
  const { mutate: getUserSubscription, data } = useMutation(
    getSubscription({
      id: userData.u_userid,
      queries: {
        onSuccess: (data) => {
          const msg = data.info ? "알림 설정됨" : "알림 설정되지 않음";
          const state = data.info ? true : false;
          const hour = data.info?.n_hour ?? defaultHour;
          setstateMsg(msg);
          setPushState(state);
          setHour(hour);
          currentHour.current = hour;
        },
      },
    })
  );
  const { mutate: setUserSubscription } = useMutation(
    setSubscription({
      id: userData.u_userid,
      queries: {
        onSuccess: (data) => {
          alert(data.message);
          setPushState(true);
          setstateMsg("알림 설정됨");
          currentHour.current = hour;
        },
      },
    })
  );
  const { mutate: deleteUserSubscription } = useMutation(
    deleteSubscription({
      id: userData.u_userid,
      queries: {
        onSuccess: (data) => {
          alert(data.message);
          setPushState(false);
          setstateMsg("알림 설정되지 않음");
          setHour(defaultHour);
          currentHour.current = defaultHour;
        },
      },
    })
  );

  useEffect(() => {
    (async () => {
      try {
        const subscription = await checkSubscription();
        getUserSubscription({ subscription });
      } catch (err) {
        setstateMsg(err.message);
        setCanPush(false);
      }
    })();
  }, []);

  const subscribe = async (vapidKey) => {
    if (!canPush) return;
    const convertedKey = urlBase64ToUint8Array(vapidKey);
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });
    setUserSubscription({ subscription, hour });
  };

  const unsubscribe = async () => {
    if (!canPush) return;
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      deleteUserSubscription({ subscription });
    }
  };

  const setHourHandler = (e) => {
    const value = Number(e.target.value);
    if (value < 0 || value > 23) return;
    setHour(e.target.value);
  };
  const resetHourHandler = (e) => {
    if (e.target.value === "") {
      e.target.value = currentHour.current;
    }
  };
  const subscribeHandler = async () => await subscribe(data.vapidPublicKey);
  const unsubscribeHandler = async () => await unsubscribe();

  return (
    <SettingBox
      icon={<FaBell />}
      title={"PUSH 알림"}
      className={"push-notification"}
    >
      <div className="push-container">
        <div className="state">
          {pushState ? <HiMiniBellAlert /> : <HiMiniBellSlash />}
          {stateMsg}
        </div>
        <label htmlFor="time">
          <span>알림 시간 (0~23):</span>
          <input
            id="time"
            className="push-time"
            type="number"
            min={0}
            max={23}
            value={hour}
            onChange={setHourHandler}
            onBlur={resetHourHandler}
            disabled={!canPush}
          />
          <span>시</span>
        </label>
        <div className="button-wrapper">
          <button className="push-set" onClick={subscribeHandler}>
            알림 설정
          </button>
          <button className="push-delete" onClick={unsubscribeHandler}>
            알림 해제
          </button>
        </div>
      </div>
    </SettingBox>
  );
};

export default PushNotification;

/**
 * cf) Web Push
 * subscribe(): 새로운 구독 생성, 기존 구독이 존재하면 해당 구독 반환.
 * + 사용자 알림을 허용하지 않은 경우 권한 요청 trigger
 * + 서버에서 생성한 VAPID public key 필요
 * getSubscription() : 기존 구독이 존재하면 해당 구독 반환, 그렇지 않으면 null 반환
 */
