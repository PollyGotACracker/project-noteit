import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { scrollPosState } from "@recoils/note";

const useScrollPosition = (target) => {
  const location = useLocation();
  const [scrollPos, setScrollPos] = useRecoilState(
    scrollPosState(location.pathname)
  );

  const saveScrollPos = () => {
    setScrollPos({
      path: location.pathname,
      pos: target.current.scrollTop,
    });
  };

  useEffect(() => {
    if (target.current) {
      target.current.scrollTop = scrollPos.pos;
    }
  }, [target.current]);

  return saveScrollPos;
};

export default useScrollPosition;
