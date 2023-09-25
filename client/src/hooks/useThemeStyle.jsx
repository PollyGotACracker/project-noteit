import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { themeState } from "@recoils/theme";
import { getStyle } from "@utils/manageStyle";

const useThemeStyle = (props) => {
  const getStyles = (vals) => {
    if (!Array.isArray(vals)) return getStyle(vals);
    else {
      const valueList = [];
      for (let idx = 0; idx < vals.length; idx++) {
        valueList[idx] = getStyle(vals[idx]);
      }
      return valueList;
    }
  };

  const userTheme = useRecoilValue(themeState);
  const [values, setValues] = useState(getStyles(props));

  useEffect(() => {
    setValues(getStyles(props));
  }, [userTheme]);

  return values;
};

export default useThemeStyle;

/**
 * cf)
 * 전역 state 변수의 값이 변경되더라도,
 * 그 변수를 직접 사용하지 않는 컴포넌트에는 변경사항이 적용되지 않는다.
 * 만약 변수를 사용하지 않는 컴포넌트가 변경된다면,
 * 다른 원인으로 인해 해당 컴포넌트에 re-rendering 이 발생한 것이다.
 */
