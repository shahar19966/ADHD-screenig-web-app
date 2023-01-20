import React from "react";
import { Alert } from "react-bootstrap";
import './ErrorMessage.css'

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert key={variant} variant={variant} style={{ fontSize: 15 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;