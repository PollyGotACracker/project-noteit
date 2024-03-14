# Troubleshooting

- [React CSS 애니메이션 재시작](#css-애니메이션-재시작)
- [React CSS transform 처리](#css-transform-처리)
- [React 컴포넌트에서 커스텀 훅으로 코드 이동 문제](#컴포넌트에서-커스텀-훅으로-코드-이동-문제)
- [Content Type 지정](#header-Content-Type-지정)
- [메인 화면 최초 진입 시 토큰 확인 문제](#메인-화면-최초-진입-시-토큰-확인-문제)
- [SVG transform](#svg-transform)

---

## React

### CSS 애니메이션 재시작

- audioPlayer.jsx
- ** 컴포넌트를 부모 컴포넌트 밖으로 빼낼 경우 **
- 리렌더링되는 element 에 `key` 를 따로 붙여, props 값이 변경될 때 css animation 이 처음부터 재시작되도록 한다.
- 이때 `key` 는 현재 요소를 이전 요소와는 다른 요소로 인식하여 강제 렌더링하는 역할을 한다(초기화).

### CSS transform 처리

- useCarousel.js

- JSX 에서 style `transform` 을 직접 적용하거나, `transition` 값을 한 블록 내에서 여러 번 적용하면 처음 및 마지막 이미지에서 넘길 때 `transition` 에 문제 발생

```js
useEffect(() => {
  const setAnimation = () => {
    requestAnimationFrame(() => {
      setTransition(ref.current, true);
      setTransform(ref.current, position);
    });
  };
  animationFrameId.current = requestAnimationFrame(setAnimation);
  return () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  };
}, [position]);
```

- ==> `useEffect` 를 사용해 `position` 이 변한 직후 `transition` 및 `transform` 적용 후, `requestAnimationFrame` 으로 스타일 변경 비동기 처리하였다.
- touch 이벤트 시 오류는 이중 `requestAnimationFrame` 사용으로 해결하였다([참고](https://medium.com/@owencm/one-weird-trick-to-performant-touch-response-animations-with-react-9fe4a0838116)).
- 단, [마지막 이미지 ...실제 이미지 리스트, 첫 이미지] 일 경우, JS 가 아닌 CSS 에서 초기 `transform` 값을 지정하여 페이지 첫 로드 시에 불필요한 `transition` 애니메이션 재생 방지가 필요하다.

### 컴포넌트에서 커스텀 훅으로 코드 이동 문제

- useQuizWrongList.js
- 컴포넌트에서는 문제가 없다가 커스텀 훅으로 만든 후
- `addWrongItem` 가 호출될 때 `addWrongItem` 은 한번 실행되지만,
- `useState` 의 setter 함수 `setWrongAnswer` 가 두 번씩 실행되는 문제 발생

1.  memoization 으로 해결되지 않음
2.  컴포넌트로 다시 옮기면 다시 정상적으로 실행됨
3.  커스텀 훅에 작성한 상태에서, `<React.StrictMode>` 를 끄니 문제 발생 X

- ==> `setWrongAnswer((prev)=>{return ...})` 하지 않고 `setWrongAnswer([...])` 로 변경하니 해결되었다.
- !!! 하지만 왜 컴포넌트에서는 문제 없이 실행되었는지 모르겠다.

## 기타

### Content Type 지정

- cf) formData 전송 시, 서버 router 미들웨어에서 `err.stack` 을 통해 에러 확인 가능
- form 에 `encType="multipart/form-data"` 를 설정하지 않고, `e.preventDefault` 로 기본 동작을 막은 후
- `headers` 에 `"Content-Type": "multipart/form-data"` 를 직접 지정할 경우
- 각 part 의 경계 문자열(Boundary)이 정의되지 않아 **Error: Multipart: Boundary not found** 문제 발생

- ==> `Content-Type` 을 지정하지 않으면 문제가 발생하지 않았다.
- 대부분의 HTTP 라이브러리, 브라우저에서는 데이터에 맞는 `Content-Type` 을 자동으로 지정해준다.
- 그러나 `Content-Type` 을 완전히 생략하면 formData 는 전송 가능했지만, JSON 은 불가능했다.

```js
const res = await fetch(`${SERVER_URL}${endPoint}`, {
  credentials: "include",
  ...options,
  headers: {
    ...(!(options?.body instanceof FormData) && {
      "Content-Type": "application/json",
    }),
    authorization: `${token}`,
    ...options?.headers,
  },
});
```

- ==> `Content-Type` 기본값으로 `"application/json"` 을 지정하고 싶었기 때문에 `!(options?.body instanceof FormData)` 조건을 만족할 경우에 지정되도록 하였다.

### 메인 화면 최초 진입 시 토큰 확인 문제

- 메인 화면 최초 진입 시 refresh token 이 존재하지 않을 경우 불필요한 에러 발생
- `X-Initial-Entry` HTTP header 를 만든 후 클라이언트에서 서버로 boolean 값을 보내도록 하였다.
- 값이 `true` 라면 쿠키가 없더라도 서버에서 401 에러를 보내지 않도록 작성하였다.

### SVG transform

- pages/index.jsx

```js
const coverRects = document.querySelectorAll(".cover rect");
let keyframes = [];
const options = {
  duration: 1000,
  // fill: web animation API 에서 CSS animation-fill-mode 와 동일
  fill: "both",
  easing: "ease-in-out",
};

coverRects.forEach((rect, idx) => {
  const rectRotate = rect.getAttribute("transform");
  // rotate(rotate transformOriginX tranformOriginY)
  let [rotate, originX, originY] = rectRotate.match(/-?\b\d+(\.\d+)?\b/g);
  rect.style.transformOrigin = `${originX}px ${originY}px`;
  keyframes = [
    { transform: `rotate(${rotate}deg) scaleX(0)` },
    { transform: `rotate(${rotate}deg) scaleX(1)` },
  ];
  rect.animate(keyframes, { ...options, delay: idx * 200 });
});
```

- svg `tranform` 은 svg 자체 속성이기 때문에 `getAttribute()` 로 값을 가져와야 한다.
- `animation-fill-mode` 를 `both` 로 설정할 경우 keyframe `tranform` 스타일이 svg `tranform` 속성을 덮어쓰는 문제가 발생하므로 별도 처리가 필요하다.
- svg 파일에서 `tranform` 의 `rotate()` 는 순서대로 CSS 의 `rotate` `transformOriginX` `tranformOriginY` 값과 같다.
