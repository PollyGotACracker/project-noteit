import PuffLoader from "react-spinners/PuffLoader";
import { getStyle } from "@utils/manageStyle";

const Fallback = ({ isLoading = true, size, color, children }) => {
  if (isLoading)
    return (
      <main
        style={{
          flex: "1",
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
};

export default Fallback;

Fallback.defaultProps = {
  size: 100,
  color: getStyle("--primary"),
};
