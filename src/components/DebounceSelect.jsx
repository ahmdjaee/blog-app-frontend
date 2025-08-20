import { Select, Spin } from "antd";
// import debounce from "lodash/debounce";
import { useMemo, useRef, useState } from "react";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    let timer = 0;
    return (...args) => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        loadOptions(...args);
      }, debounceTimeout);
    };
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : "No results found"}
      {...props}
      options={options}
    />
  );
}

export default DebounceSelect;
