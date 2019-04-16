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
import { useEffect } from "react";
import { PasswordValidationRequest } from "src/api/authentication/types";
import useAppNavigation from "src/components/AppChrome/useAppNavigation";
import Loader from "src/components/Loader";
import useIdFromPath from "src/lib/useIdFromPath";
import { useConfig } from "src/startup/config";
import { User } from "..";
import { useUsers } from "../api";
import { validateAsync } from "../validation";
import "./EditUser.css";
import UserForm from "./UserForm";
import UserFormData from "./UserFormData";

const EditUserContainer = () => {
  const { updateUser, fetchUser, user } = useUsers();
  const userId = useIdFromPath("user/");
  const { authenticationServiceUrl } = useConfig();
  const { goToUsers } = useAppNavigation();
  if (!authenticationServiceUrl)
    throw Error("Configuration not ready or misconfigured!");
  useEffect(() => {
    if (!!userId && !user) fetchUser(userId);
  }, [fetchUser, userId, user]);

  if (!!user) {
    return (
      <UserForm
        user={user}
        onBack={() => goToUsers()}
        onSubmit={(user: User) => updateUser(user)}
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
  } else {
    return <Loader message="" />;
  }
};

export default EditUserContainer;
