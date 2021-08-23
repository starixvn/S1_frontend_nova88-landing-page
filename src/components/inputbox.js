import React from "react";
import PropTypes from "prop-types";

const InputBox = ({
  icon,
  placeholder,
  inputType,
  onChange,
  onBlur,
  value,
}) => {
  return (
    <div>
      {icon}
      <input
        type={inputType ?? "text"}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value ?? ""}
      />
    </div>
  );
};

InputBox.propTypes = {
  icon: PropTypes.node,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InputBox;
