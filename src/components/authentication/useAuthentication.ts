import * as Cookies from "cookies-js";
import { useCallback } from "react";

import useApi from "./useApi";
import { Credentials } from "./types";

interface Callbacks {
  setStatus: (message: string) => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

interface UseAuthentication {
  login: (credentials: Credentials, callbacks: Callbacks) => void;
}

const useAuthentication = (): UseAuthentication => {
  const { apiLogin } = useApi();
  const login = useCallback(
    (credentials: Credentials, callbacks: Callbacks) => {
      const { setStatus, setSubmitting } = callbacks;
      apiLogin(credentials).then(response => {
        if (response.loginSuccessful) {
          // Otherwise we'll extract what we expect to be the successful login redirect URL
          Cookies.set("username", credentials.email);
          window.location.href = response.redirectUrl;
        } else {
          setStatus(response.message);
          setSubmitting(false);
        }
        return;
      });
    },
    [apiLogin],
  );

  return { login };
};

export default useAuthentication;
