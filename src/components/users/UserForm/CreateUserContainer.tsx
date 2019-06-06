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
import useAppNavigation from "lib/useAppNavigation";
import { PasswordValidationRequest } from "components/authentication/types";
import useConfig from "startup/config/useConfig";
import { useUsers } from "../api";
import { User } from "../types";
import { validateAsync } from "../validation";
import UserForm from "./UserForm";
import UserFormData from "./UserFormData";

const CreateUserContainer = () => {
  const { createUser } = useUsers();
  const { authBaseServiceUrl } = useConfig();
  const authenticationServiceUrl = `${authBaseServiceUrl}/authentication/v1`;
  if (!authenticationServiceUrl)
    throw Error("Configuration not ready or misconfigured!");

  const {
    nav: { goToUsers },
  } = useAppNavigation();
  const initialValues: UserFormData = {
    firstName: "",
    lastName: "",
    email: "",
    state: "enabled",
    password: "",
    verifyPassword: "",
    neverExpires: false,
    comments: "",
    forcePasswordChange: true,
  };
  return (
    <UserForm
      user={initialValues}
      onSubmit={(user: User) => createUser(user)}
      onBack={() => goToUsers()}
      onCancel={() => goToUsers()}
      onValidate={(values: UserFormData) => {
        if (!!values.password && !!values.verifyPassword && !!values.email) {
          const passwordValidationRequest: PasswordValidationRequest = {
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

export default CreateUserContainer;
