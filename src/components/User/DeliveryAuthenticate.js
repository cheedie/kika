import React from "react";
import { Outlet } from "react-router-dom";
import { createBrowserHistory } from "history";

import createToken from "../../utils/createToken";

const DeliveryAuthenticate = () => {
  const response = createToken();
  if (response) {
    // check if user is verified or has completed profile
    createBrowserHistory().push("/delivery");
    createBrowserHistory().go(0);
    return null;
  }

  return <Outlet />;
};

export default DeliveryAuthenticate;
