import * as Cookies from "cookies-js";
import { FormikBag } from "formik";
import * as queryString from "query-string";
import { useCallback } from "react";
import useHttpClient from "lib/useHttpClient";
import useRouter from "lib/useRouter";
import { useConfig } from "startup/config";
import { ChangePasswordResponse } from ".";
import {
  ChangePasswordRequest,
  Credentials,
  LoginResponse,
  PasswordValidationRequest,
  PasswordValidationResponse,
  ResetPasswordRequest,
} from "./types";

interface Api {
  apiLogin: (credentials: Credentials) => Promise<LoginResponse>;
  resetPassword: (
    resetPasswordRequest: ResetPasswordRequest,
  ) => Promise<ChangePasswordResponse>;
  changePassword: (
    changePasswordRequest: ChangePasswordRequest,
  ) => Promise<ChangePasswordResponse>;
  submitPasswordChangeRequest: (
    formData: any,
    formikBag: FormikBag<any, any>,
  ) => Promise<void>;
  isPasswordValid: (
    passwordValidationRequest: PasswordValidationRequest,
  ) => Promise<PasswordValidationResponse>;
}

export const useApi = (): Api => {
  const { httpGetJson, httpPostJsonResponse } = useHttpClient();
  let { authenticationServiceUrl, appClientId } = useConfig();

  // If we have a clientId on the URL we'll use that. It means we're logging
  // in on behalf of a relying party so we need to identify as them.
  const { router } = useRouter();
  if (!!router && !!router.location) {
    const query = queryString.parse(router.location.search);
    if (!!query.clientId) {
      appClientId = query.clientId + "";
    }
  }

  const apiLogin = useCallback(
    (credentials: Credentials) => {
      const { email, password } = credentials;
      const loginServiceUrl = `${authenticationServiceUrl}/authenticate`;

      // We need to post the sessionId in the credentials, otherwise the
      // authenticationService will have no way of marking the session as valid.
      const fullSessionId = Cookies.get("authSessionId");
      let sessionId = fullSessionId;
      if (fullSessionId.indexOf(".") > -1) {
        sessionId = fullSessionId.slice(0, fullSessionId.indexOf("."));
      }

      return httpPostJsonResponse(
        loginServiceUrl,
        {
          body: JSON.stringify({
            email,
            password,
            sessionId,
            requestingClientId: appClientId,
          }),
        },
        false,
      );
    },
    [httpPostJsonResponse],
  );

  const changePassword = useCallback(
    (changePasswordRequest: ChangePasswordRequest) => {
      const url = `${authenticationServiceUrl}/changePassword/`;
      const { password, oldPassword, email } = changePasswordRequest;

      return httpPostJsonResponse(
        url,
        { body: JSON.stringify({ newPassword: password, oldPassword, email }) },
        false,
      );
    },
    [],
  );

  const resetPassword = useCallback(
    (resetPasswordRequest: ResetPasswordRequest) => {
      const newPassword = resetPasswordRequest.password;
      const url = `${authenticationServiceUrl}/resetPassword/`;
      return httpPostJsonResponse(url, {
        body: JSON.stringify({ newPassword }),
      });
    },
    [],
  );

  const submitPasswordChangeRequest = useCallback((formData: any) => {
    const url = `${authenticationServiceUrl}/reset/${formData.email}`;
    return httpGetJson(url, {}, false);
  }, []);

  const isPasswordValid = useCallback(
    (passwordValidationRequest: PasswordValidationRequest) => {
      const url = `${authenticationServiceUrl}/isPasswordValid`;
      return httpPostJsonResponse(url, {
        body: JSON.stringify(passwordValidationRequest),
      });
    },
    [],
  );

  return {
    apiLogin,
    submitPasswordChangeRequest,
    resetPassword,
    changePassword,
    isPasswordValid,
  };
};

export default useApi;
