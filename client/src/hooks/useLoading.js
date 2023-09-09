import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(true);

  return {
    isLoading: loading,
    showContent: () => setTimeout(() => setLoading(false), 500),
  };
};

export default useLoading;
