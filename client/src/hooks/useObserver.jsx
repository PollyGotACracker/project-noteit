import { useCallback, useEffect, useRef, useState } from "react";

const useObserver = (target) => {
  const observerRef = useRef(null);
  const [observed, setObserved] = useState(false);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setObserved(entries.some((entry) => entry.isIntersecting));
      });
    }
    return observerRef.current;
  }, [observerRef.current]);

  useEffect(() => {
    if (target.current) {
      getObserver().observe(target.current);
    }
  }, [target.current]);

  return observed;
};

export default useObserver;
