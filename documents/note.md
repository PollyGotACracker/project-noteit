# Note

- [React useRef export](#useref-export)
- [React Query invalidateQueries 의 배열 queryKey](#invalidateQueries-의-배열-queryKey)
- [Service Worker notification data](#service-worker-notification-data)
- [Service Worker subscription](#service-worker-subscription)
- [CSS var JS에서 처리](#css-var-JS에서-처리)
- [사용자 선호 테마 값 가져오기](#사용자-선호-테마-값-가져오기)
- [정규표현식 단어 경계](#정규표현식-단어-경계)
- [차트 라벨 줄바꿈](#차트-라벨-줄바꿈)

---

## React

### useRef export

- 커스텀 훅에서 `useRef` 로 만든 변수의 `current` 를 return 하지 않는다.
- 이 값을 사용하는 컴포넌트에서는 값이 변경되었음을 감지할 수 없다.

## React-Query

### invalidateQueries 의 배열 queryKey

- `queryKey` 는 첫 번째 요소부터 비교된다.
- 만약 refetch 하고자 하는 쿼리의 `queryKey` 가 배열이고, `invalidateQueries()` 옵션을 `exact: false` 로 주어 개별 키에 대해 업데이트 하고자 할 때
- `queryKey` 의 첫 번째 요소가 일치하지 않을 경우 해당 옵션이 있어도 쿼리는 refetch 되지 않는다.

## 기타

### Service Worker notification data

```js
self.addEventListener("push", (e) => {
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/logo512.png",
      data: data,
      requireInteraction: true,
    })
  );
});
```

```js
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url));
});
```

- `notificationclick` 이벤트에서 `e.notification.data` 는 `push` 이벤트에서 `self.registration.showNotification()` 에 전달한 `data` 프로퍼티의 값이다.

### Service Worker subscription

```js
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
```

- pushNotification.jsx
- push API 의 `subscribe()`:  
  새로운 구독 생성, 기존 구독이 존재하면 해당 구독 반환.  
  사용자 알림을 허용하지 않은 경우 권한 요청을 trigger 한다.  
  서버에서 생성한 VAPID public key 가 필요하다.
- 서버에서 전달한 VAPID public key 를 URL-safe base64 문자열에서 Uint8Array 로 변환하는 `urlBase64ToUint8Array()` 함수 작성
- 데이터베이스에서 구독이 존재하면 해당 구독 반환, 그렇지 않으면 `null` 을 반환하는 `getSubscription()` fetch 함수 작성

### CSS var JS에서 처리

- JS 로 가져오기: `getComputedStyle(document.documentElement).getPropertyValue('--variable-name')`
- JS 에서 세팅하기: `document.documentElement.style.setProperty('--variable-name', 'black')`

### 사용자 선호 테마 값 가져오기

- `window.matchMedia("(prefers-color-scheme: dark)").matches`
- boolean 값 반환

### 정규표현식 단어 경계

- `\b`: 단어 경계(단어 문자와 그렇지 않은 문자 사이의 경계 탐색)
- 여기서 단어는 알파벳, 숫자, underbar 로 구성된 문자열

### 차트 라벨 줄바꿈

- nested array 를 사용하면 Chart.js 에서 multiple-lines label 이 가능하다.
