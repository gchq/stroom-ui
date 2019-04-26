import * as Cookies from "cookies-js";
import { FormikBag } from "formik";
import * as queryString from "query-string";
import { useCallback } from "react";
import useHttpClient from "lib/useHttpClient";
import useRouter from "lib/useRouter";
import useConfig from "startup/config/useConfig";
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
    [authenticationServiceUrl, appClientId, httpPostJsonResponse],
  );

  const changePassword = useCallback(
    ({ password, oldPassword, email }: ChangePasswordRequest) =>
      httpPostJsonResponse(
        `${authenticationServiceUrl}/changePassword/`,
        { body: JSON.stringify({ newPassword: password, oldPassword, email }) },
        false,
      ),
    [authenticationServiceUrl, httpPostJsonResponse],
  );

  const resetPassword = useCallback(
    ({ password }: ResetPasswordRequest) =>
      httpPostJsonResponse(`${authenticationServiceUrl}/resetPassword/`, {
        body: JSON.stringify({ password }),
      }),
    [authenticationServiceUrl, httpPostJsonResponse],
  );

  const submitPasswordChangeRequest = useCallback(
    (formData: any) =>
      httpGetJson(
        `${authenticationServiceUrl}/reset/${formData.email}`,
        {},
        false,
      ),
    [authenticationServiceUrl, httpGetJson],
  );

  const isPasswordValid = useCallback(
    (passwordValidationRequest: PasswordValidationRequest) =>
      httpPostJsonResponse(`${authenticationServiceUrl}/isPasswordValid`, {
        body: JSON.stringify(passwordValidationRequest),
      }),
    [authenticationServiceUrl, httpPostJsonResponse],
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
