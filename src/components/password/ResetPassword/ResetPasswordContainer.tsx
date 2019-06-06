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

import * as React from "react";
import { PasswordValidationRequest } from "components/authentication/types";
import { validateAsync } from "components/users/validation";
import ChangePasswordFormData from "../ChangePassword/ChangePasswordFormData";
import ResetPassword from "./ResetPassword";
import useResetPassword from "./useResetPassword";
import { useTokenValidityCheck } from "./useTokenValidityCheck";
import useServiceUrl from "startup/config/useServiceUrl";

const ResetPasswordContainer = () => {
  const { resetPassword } = useResetPassword();
  const { authenticationServiceUrl } = useServiceUrl();

  const {
    isTokenMissing,
    isTokenInvalid,
    isTokenExpired,
  } = useTokenValidityCheck();

  const onValidate = (values: ChangePasswordFormData) => {
    if (
      !!values.oldPassword &&
      !!values.password &&
      !!values.verifyPassword &&
      !!values.email
    ) {
      const passwordValidationRequest: PasswordValidationRequest = {
        oldPassword: values.oldPassword,
        verifyPassword: values.verifyPassword,
        email: values.email,
      };
      return validateAsync(passwordValidationRequest, authenticationServiceUrl);
    } else return Promise.resolve();
  };
  return (
    <ResetPassword
      onSubmit={resetPassword}
      onValidate={onValidate}
      isTokenExpired={isTokenExpired}
      isTokenInvalid={isTokenInvalid}
      isTokenMissing={isTokenMissing}
    />
  );
};

export default ResetPasswordContainer;
