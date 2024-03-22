# Troubleshooting

- [React CSS 애니메이션 재시작](#css-애니메이션-재시작)
- [React CSS transform 처리](#css-transform-처리)
- [React 컴포넌트에서 커스텀 훅으로 코드 이동 문제](#컴포넌트에서-커스텀-훅으로-코드-이동-문제)
- [React Query invalidateQueries 실행 시점 문제](#invalidatequeries-실행-시점-문제)
- [Content Type 지정](#header-Content-Type-지정)
- [메인 화면 최초 진입 시 토큰 확인 문제](#메인-화면-최초-진입-시-토큰-확인-문제)
- [SVG transform](#svg-transform)
- [date input 에 커스텀 placeholder 적용](#date-input-에-커스텀-placeholder-적용)

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

## React Query

### invalidateQueries 실행 시점 문제

- 문제 상황:

  1. subject Detail 페이지에서 해당 subject 삭제 후, List 페이지로 navigate 되었을 때  
     목록에 해당 subject 가 그대로 남아있음
  2. mutation `onSuccess` 옵션에서 `invalidateQueries` 를 사용해 첫 번째 queryKey 와 일치하는 모든 쿼리(2개)를 무효화하도록 한 상태
  3. 그러나 category 정보 데이터는 `fresh`, subject 리스트 데이터는 `stale` 하였음
  4. 한편, subject List 페이지에서 subject 를 삭제한 경우에는 두 데이터 모두 `fresh` 하였음

- 고려 사항:

  1. 두 상황 모두 같은 mutation 코드 사용
  2. subject List 페이지에서: 데이터를 사용하는 컴포넌트는 mount 상태
  3. subject Detail 페이지에서: 데이터를 사용하는 컴포넌트는 unmount 상태,  
     mutation 후 반환되는 `isSuccess` 값과 `useEffect` 를 사용해 List 페이지로 navigate 되도록 하였음

- 해결:
  - 페이지 이동과 쿼리 무효화 사이의 타이밍 문제였다.
  - `invalidateQueries` 가 완료될 때까지 기다린 후 페이지가 이동되어야 한다.
  - 그러므로 `onSuccess` 에 `async`-`await` 키워드를 이용하였다.
  - 추가적으로 `Promise.all()` 추가로 여러 작업 병렬 처리, queryKey 를 구체화하여 캐싱 작업을 효율화하였다.

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

### date input 에 커스텀 placeholder 적용

- components/todo/input.jsx, styles/todo/input.css

- 구현 사항:

  1. input `required` 를 사용하지 않음
  2. 초기 상태에서 focus 되지 않을 경우 input `placeholder` 텍스트 표시
  3. 초기 상태에서 focus(또는 캘린더 아이콘 클릭)된 경우  
     `placeholder` 텍스트가 사라지고 기존 텍스트인 `연도-월-일` 표시
  4. 값이 있고 유효할 경우 해당 값 표시
  5. 값이 있지만 유효하지 않을 경우 해당 값 표시, input `border-color` 값 변경
  6. 입력한 값을 전부 지웠을 경우 `placeholder` 표시

- 고려 사항:

  - clear 상태나 초기 `value` 값 `""` 은 valid 함
  - 사용자가 값을 완전히 입력하지 않거나, `2024-09-31` 등 잘못된 값 입력 시 invalid 하며  
    input 필드 값은 유지되지만 _`value` 값은 `""` 으로 변경됨_
  - 입력값이 `min`, `max` 지정값에서 벗어날 경우 invalid 하며 `value` 값은 입력값 그대로 유지됨
  - 기존 `연도-월-일` 텍스트를 유지하면 사용자가 직접 값을 타이핑 할 수 있음
  - 최초 로드 및 clear 상태와 invalid 한 상태를 각각 분리해야 함

- 해결:

  - 값이 채워졌는지 판단하는 flag 변수의 값은 `false` 로 초기화,  
    값이 `""` 가 아닐 때 `true` 로 변경하였다.
  - flag 변수의 값이 `true` 이면 input 의 clear 상태 class 를 제거한다.
  - submit 할 때 flag 변수를 초기화한다.
  - `.class명:valid` 로 clear 된 상태의 요소를 선택하도록 하였다.

- 참고:
  - 사용자가 직접 타이핑이 가능하기 때문에 `min`, `max` 속성 작성  
    그렇지 않으면 연도가 6자리까지 작성됨  
    단, invalid 하더라도 제출 시 별도의 유효성 검사 필요
  - 가상 클래스의 `content` 에 `attr(...)` 를 작성하면 해당 요소의 속성 값이 적용됨: [참고](https://developer.mozilla.org/en-US/docs/Web/CSS/attr)
  - !! Firefox 에서는 CSS 를 사용한 date input 커스터마이징이 불가능함

```css
input[type="date"] {
  /* display: flex 로 요소들을 가로 정렬한 후,
  position 을 사용하여 캘린더 아이콘 위치를 고정시켰음 */
  position: relative;
  display: flex;
  align-items: center;
}
input[type="date"]:invalid {
  border-color: red;
}

/* 캘린더 아이콘 */
input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 8px;
}

/* 연도-월-일 텍스트 */
input[type="date"].clear:valid:not(:focus)::-webkit-datetime-edit-text,
input[type="date"].clear:valid:not(:focus)::-webkit-datetime-edit-month-field,
input[type="date"].clear:valid:not(:focus)::-webkit-datetime-edit-day-field,
input[type="date"].clear:valid:not(:focus)::-webkit-datetime-edit-year-field {
  -webkit-appearance: none;
  /* display: none 을 주면 :not(:focus) 임에도 불구하고
  focus 시 텍스트가 나타나지 않아 opacity: 0 사용 */
  opacity: 0;
}

/* placeholder 텍스트 */
input[type="date"].clear:valid:not(:focus):before {
  content: attr(placeholder);
}
input[type="date"].clear:valid:focus:before {
  display: none;
}
```
