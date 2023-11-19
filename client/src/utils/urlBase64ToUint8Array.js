const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default urlBase64ToUint8Array;

/**
 * cf)
 * Web Push 구현 시 서버에서 전달한 VAPID public key 를
 * URL-safe base64 문자열에서 Uint8Array로 변환하는 함수
 */
