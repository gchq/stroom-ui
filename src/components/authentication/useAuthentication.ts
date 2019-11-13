import * as React from "react";
import * as Cookies from "cookies-js";
import { useCallback } from "react";

import useApi from "./useApi";
import { Credentials } from "./types";

interface UseAuthentication {
  login: (credentials: Credentials) => void;
  loginResultMessage: string;
}

const useAuthentication = (): UseAuthentication => {
  const { apiLogin } = useApi();
  const [loginResultMessage, setLoginResultMessage] = React.useState(undefined);

  const login = useCallback(
    (credentials: Credentials) => {
      apiLogin(credentials).then(response => {
        if (response.loginSuccessful) {
          // Otherwise we'll extract what we expect to be the successful login redirect URL
          Cookies.set("username", credentials.email);
          window.location.href = response.redirectUrl;
        } else {
          setLoginResultMessage(response.message);
        }
        return;
      });
    },
    [apiLogin],
  );

  return { login, loginResultMessage };
};

export default useAuthentication;
