const checkPermission = () => {
  const value = Notification.permission;
  if (value === "denied") return false;
  if (value === "granted") return true;
  return false;
};

export const checkSubscription = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    const isGranted = checkPermission();
    if (subscription && isGranted) {
      return subscription;
    }
    return null;
  } else {
    throw new Error("푸시 알림을 지원하지 않는 브라우저입니다.");
  }
};
