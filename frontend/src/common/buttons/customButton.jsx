
import PropTypes from 'prop-types';
import '../buttons/buttons.css';

const CustomButton = ({ onClick, children, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      className={`custom-button ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default CustomButton;
