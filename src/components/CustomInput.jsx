import { useState, useEffect } from "react";

const CustomInput = ({ onChange, initialValue, type, placeholder, customStyle }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      className="form-control"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={customStyle ?? customStyle}
    />
  );
};

export default CustomInput;
