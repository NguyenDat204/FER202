import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ message, onClose }) => {
  const [show, setShow] = React.useState(!!message);

  React.useEffect(() => {
    if (message) setShow(true);
  }, [message]);

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        bg="success"
        onClose={() => {
          setShow(false);
          onClose && onClose();
        }}
        show={show}
        delay={1500}
        autohide
      >
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
