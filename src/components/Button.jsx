// src/components/Button.js
import React from 'react';
import PropTypes from 'prop-types';

function Button({ text, onClick, type = 'button', disabled = false, style = {}, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`button ${className}`} // Use className for styling consistency
    >
      {text}
    </button>
  );
}

// PropTypes for type-checking
Button.propTypes = {
  text: PropTypes.string.isRequired,       // The button text
  onClick: PropTypes.func,                 // Function to handle click events
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // HTML button types
  disabled: PropTypes.bool,                // Disabled state
  style: PropTypes.object,                 // Custom inline styles
  className: PropTypes.string,             // Additional class names for styling
};

// Default props if none are passed
Button.defaultProps = {
  type: 'button',
  disabled: false,
  style: {},
  className: '',
};

export default Button;
