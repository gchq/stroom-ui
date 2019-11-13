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
import useForm from "react-hook-form";
import { Button } from "antd";
import { RequiredFieldMessage } from "components/FormComponents";

const LoginForm: React.FunctionComponent<{
  onSubmit: (credentials: Credentials) => void;
  isSubmitting: boolean;
  loginResultMessage?: string;
  allowPasswordResets?: boolean;
}> = ({ onSubmit, allowPasswordResets, loginResultMessage, isSubmitting }) => {
  const { register, handleSubmit, getValues, errors } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const { email, password } = getValues();
  const disableSubmit = email === "" || password === "";
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
                type="primary"
                loading={isSubmitting}
                disabled={disableSubmit}
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
