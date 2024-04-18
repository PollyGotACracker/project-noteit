import style from "./error.module.css";
import { ReactComponent as NotFoundSvg } from "@assets/images/not_found.svg";
import { useRecoilValue } from "recoil";
import useThemeStyle from "@hooks/useThemeStyle";
import { isSignedInState } from "@recoils/user";
import { SignInLayout, SignOutLayout } from "@/pages";
import cx from "classnames";

export default function NotFound() {
  const isSignedIn = useRecoilValue(isSignedInState);

  return isSignedIn ? (
    <SignInLayout isNotFound={true}>
      <NotFoundMain isSignedIn={isSignedIn} />
    </SignInLayout>
  ) : (
    <SignOutLayout isNotFound={true}>
      <NotFoundMain isSignedIn={isSignedIn} />
    </SignOutLayout>
  );
}

function NotFoundMain({ isSignedIn }) {
  const primary = useThemeStyle("--primary");

  return (
    <main className={cx([style.main, { [style.signout]: !isSignedIn }])}>
      <div className={style.image_wrapper}>
        <NotFoundSvg className={style.image} fill={primary} />
      </div>
      <h1 className={style.title}>404 Not Found</h1>
      <p className={style.description}>요청한 URL 페이지를 찾을 수 없습니다.</p>
    </main>
  );
}

// svg 를 component 형식으로 import 하면 편집 가능
// svg 파일에서 편집할 색상을 current 로 지정하면
// 컴포넌트 fill 속성의 값으로 채워짐
