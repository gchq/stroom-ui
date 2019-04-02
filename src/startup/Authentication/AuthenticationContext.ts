import * as React from "react";

interface AuthenticationContextApi {
  idToken: string;
  setIdToken: (idToken: string) => void;
}

const AuthenticationContext: Context<AuthenticationContextApi> = createContext({
  idToken: "",
  setIdToken: () => {
    console.error("Default Implementation for Authentication Context");
  },
});

export default AuthenticationContext;
