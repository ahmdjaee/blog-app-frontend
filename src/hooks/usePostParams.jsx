import { useState } from "react";

const usePostParams = () => {
  const [params, setParams] = useState({
    limit: 15,
    page: 1,
    published: 1,
  });
  return { params, setParams };
};

export default usePostParams;
