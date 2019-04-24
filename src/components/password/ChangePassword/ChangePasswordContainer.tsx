/*
 * Copyright 2017 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Cookies from "cookies-js";
import * as queryString from "query-string";
import * as React from "react";
import { useEffect, useState } from "react";
import { PasswordValidationRequest } from "components/authentication";
import { validateAsync } from "components/users/validation";
import useRouter from "lib/useRouter";
import { useConfig } from "startup/config";
import ChangePasswordForm from "./ChangePasswordForm";
import usePassword from "./useChangePassword";

const ChangePasswordContainer = () => {
  const { changePassword, showChangeConfirmation } = usePassword();
  const { router } = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("");
  const [email, setEmail] = useState("");

  const { authenticationServiceUrl } = useConfig();
  if (!authenticationServiceUrl)
    throw Error("Config not ready or misconfigured!");

  useEffect(() => {
    if (!!router.location) {
      const query = queryString.parse(router.location.search);

      const redirectUrl: string = query.redirect_url as string;
      if (!!redirectUrl) {
        const decodedRedirectUrl: string = decodeURIComponent(redirectUrl);
        setRedirectUrl(decodedRedirectUrl);
      }

      let email: string = query.email as string;
      if (email === undefined) {
        email = Cookies.get("username");
      }

      if (email) {
        setEmail(email);
      } else {
        console.error(
          "Unable to display the change password page because we could not get the user's email address from either the query string or a cookie!",
        );
      }
    }

    // Try and get the user's email from the query string, and fall back on a cookie.
  }, [router.location, setRedirectUrl, setEmail]);

  return (
    <ChangePasswordForm
      onSubmit={changePassword}
      redirectUrl={redirectUrl}
      email={email}
      showChangeConfirmation={showChangeConfirmation}
      onValidate={values => {
        if (
          !!values.oldPassword &&
          !!values.password &&
          !!values.verifyPassword &&
          !!values.email
        ) {
          const passwordValidationRequest: PasswordValidationRequest = {
            oldPassword: values.oldPassword,
            newPassword: values.password,
            verifyPassword: values.verifyPassword,
            email: values.email,
          };
          return validateAsync(
            passwordValidationRequest,
            authenticationServiceUrl,
          );
        } else return Promise.resolve();
      }}
    />
  );
};

export default ChangePasswordContainer;
