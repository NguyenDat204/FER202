import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const ErrorAlert = ({ show, message }) => {
  if (!show) return null;
  return (
    <Alert variant="danger">
      <strong>Lỗi:</strong> {message}
    </Alert>
  );
};

ErrorAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

ErrorAlert.defaultProps = {
  message: "Vui lòng kiểm tra lại thông tin!",
};

export default ErrorAlert;
