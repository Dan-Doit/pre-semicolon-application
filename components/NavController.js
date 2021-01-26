import { useIsLoggedIn } from "../AuthContext";
import React from "react";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";


export default () => {

  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? <MainNavigation /> : <AuthNavigation />;
};



