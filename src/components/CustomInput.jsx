import { useState, useEffect } from "react";

const CustomInput = ({ onChange, initialValue, type, placeholder }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default CustomInput;
