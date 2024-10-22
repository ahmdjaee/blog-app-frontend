import { useEffect, useState } from "react";

const useSlug = ({ value }) => {
  const [slug, setSlug] = useState("");
  
  useEffect(() => {
    setSlug(value?.replace(/\s+/g, "-").toLowerCase());
  }, [value]);

  return slug;
};

export default useSlug;
