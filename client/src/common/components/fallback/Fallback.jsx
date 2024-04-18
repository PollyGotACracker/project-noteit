import PuffLoader from "react-spinners/PuffLoader";
import { getStyle } from "@utils/manageStyle";

export default function Fallback({
  isLoading = true,
  size = 100,
  color = getStyle("--primary"),
  children,
}) {
  if (isLoading)
    return (
      <main
        style={{
          flex: "1",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PuffLoader
          color={color}
          // cssOverride={}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </main>
    );
  return <>{children}</>;
}
