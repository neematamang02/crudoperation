import React from "react";
import NotificationBanner from "../components/NotificationBanner";


const FooBar = () => {
  return (
    <div>
      <h1>FooBar Component</h1>
      <p>This is the main content of FooBar.</p>
      <NotificationBanner message="This is a notification banner at the bottom of the page!" />
    </div>
  );
};

export default FooBar;
