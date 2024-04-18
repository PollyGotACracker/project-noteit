import { useEffect, useState } from "react";

const useDropDown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const switchIsMenuOpen = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return [isMenuOpen, setIsMenuOpen, switchIsMenuOpen];
};

export default useDropDown;
