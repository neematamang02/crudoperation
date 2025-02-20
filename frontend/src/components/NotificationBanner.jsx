import React from "react";
import { createPortal } from "react-dom";

const NotificationBanner = ({ message }) => {
  return createPortal(
    // component to render
    <div className="notification-banner">{message}</div>,
    // element to render into
    document.body
  );
};

export default NotificationBanner;
