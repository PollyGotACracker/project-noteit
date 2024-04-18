import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { scrollPosState } from "@recoils/scroll";

const useScrollPosition = (target) => {
  const location = useLocation();
  const [scrollPos, setScrollPos] = useRecoilState(
    scrollPosState(location.pathname)
  );

  const saveScrollPos = (pos) => {
    setScrollPos({
      path: location.pathname,
      pos: typeof pos === "number" ? pos : target.current.scrollTop,
    });
  };

  useLayoutEffect(() => {
    if (target.current) {
      target.current.scrollTop = scrollPos.pos;
    }
  }, [target.current, scrollPos]);

  return saveScrollPos;
};

export default useScrollPosition;
