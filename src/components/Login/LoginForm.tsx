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
import { NavLink } from "react-router-dom";
import { Credentials } from "components/authentication/types";
import Button from "components/Button";
import * as Yup from "yup";
import useForm from "react-hook-form";
import { RequiredFieldMessage } from "components/FormComponents";

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm: React.FunctionComponent<{
  onSubmit: (credentials: Credentials) => void;
  loginResultMessage?: string;
  allowPasswordResets?: boolean;
}> = ({ onSubmit, allowPasswordResets, loginResultMessage }) => {
  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: LoginValidationSchema,
  });

  const isPristine = !formState.dirty;
  const hasErrors = errors.email !== undefined || errors.password !== undefined;

  return (
    <div className="content-floating-without-appbar">
      <div className="Login__container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="Login__content">
            <div className="Login__icon-container">
              <img
                src={require("../../images/infinity_logo.svg")}
                alt="Stroom logo"
              />
            </div>
            <div className="field-container vertical">
              <div className="horizontal-label-and-validation-container">
                <label>Email</label>
              </div>
              <input
                ref={register({ required: true })}
                name="email"
                autoFocus
              />
              {errors.email && <RequiredFieldMessage />}
            </div>
            <div className="field-container vertical">
              <div className="horizontal-label-and-validation-container">
                <label>Password</label>
              </div>
              <input
                ref={register({ required: true })}
                name="password"
                type="password"
              />
              {errors.password && <RequiredFieldMessage />}
            </div>
            <div className="Login__status-container">
              {loginResultMessage ? (
                <div className="validation-error">{loginResultMessage}</div>
              ) : (
                <div />
              )}
              {allowPasswordResets ? (
                <NavLink
                  className="Login__reset-password"
                  to={"/resetPasswordRequest"}
                >
                  Reset password?
                </NavLink>
              ) : (
                undefined
              )}
            </div>
            <div className="Login__actions page__buttons Button__container">
              <Button
                appearance="contained"
                action="primary"
                disabled={isPristine || hasErrors}
                type="submit"
                text="Sign in"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
