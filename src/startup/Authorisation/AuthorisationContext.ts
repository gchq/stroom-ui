import { Context, createContext } from "react";
import { AppPermissions } from "./types";

interface AuthorisationContextApi {
  appPermissions: AppPermissions;
  fetchAppPermission: (appPermission: string) => void;
}

const AuthorisationContext: Context<AuthorisationContextApi> = createContext({
  appPermissions: {},
  fetchAppPermission: () => {
    console.error("Default Implementation for Authorisation Context");
  },
});

export default AuthorisationContext;
