import * as React from "react";
import { FunctionComponent, useState } from "react";

import AuthenticationContext from "./AuthenticationContext";

const AuthenticationContextProvider: FunctionComponent<{}> = ({ children }) => {
  const [idToken, setIdToken] = useState<string>("");

  return (
    <AuthenticationContext.Provider value={{ idToken, setIdToken }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
