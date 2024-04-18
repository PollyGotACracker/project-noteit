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
