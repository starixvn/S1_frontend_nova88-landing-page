import React from "react";
import PropTypes from "prop-types";

const InputBox = ({
  icon,
  placeholder,
  inputType,
  onChange,
  onBlur,
  value,
  areaCode,
}) => {
  return (
    <div>
      {icon}
      {areaCode}
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
  areaCode: PropTypes.node,
  icon: PropTypes.node,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InputBox;
