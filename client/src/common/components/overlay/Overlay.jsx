import style from "./overlay.module.css";
import { useSetRecoilState } from "recoil";
import { closeSidebarSelector } from "@recoils/layout";
import cx from "classnames";

export default function Overlay({ isActive, isSidebar = false }) {
  const closeSidebar = useSetRecoilState(closeSidebarSelector);

  const onClick = () => {
    if (isSidebar && isActive) {
      closeSidebar();
    }
  };

  if (isActive)
    return (
      <div
        className={cx(style.overlay, {
          [style.active]: isActive,
          [style.sidebar]: isSidebar,
        })}
        onClick={onClick}
      />
    );
}
