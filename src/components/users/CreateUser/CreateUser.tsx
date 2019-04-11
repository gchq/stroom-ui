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

import { Form, Formik } from "formik";
import * as React from "react";
import Button from "src/components/Button";
import { hasAnyProps } from "src/lib/lang";
import "src/styles/from_auth/Layout.css";
import { User } from "../types";
import { NewUserValidationSchema } from "../validation";
import "./CreateUserForm.css";
import UserFields from "./UserFields";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  password: string;
  verifyPassword: string;
  neverExpires: boolean;
  comments: string;
  forcePasswordChange: boolean;
}

// If we don't pass initialValues to Formik then they won't be controlled
// and we'll get console errors when they're used.
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
interface Props {
  onCreateUser: (user: User) => void;
  onBack: () => void;
  onValidate: (values: UserFormData) => Promise<void>;
}
const CreateUser: React.FunctionComponent<Props> = ({
  onCreateUser,
  onBack,
  onValidate,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => onCreateUser(values)}
      validate={onValidate}
      validationSchema={NewUserValidationSchema}
    >
      {({ errors, touched, setFieldTouched, setFieldValue }) => {
        const isPristine = !hasAnyProps(touched);
        const hasErrors = hasAnyProps(errors);
        return (
          <Form>
            <div className="header">
              <Button
                className="primary toolbar-button-small"
                icon="arrow-left"
                onClick={onBack}
                text="Back"
                type="button"
              />
            </div>
            <UserFields
              showCalculatedFields={false}
              errors={errors}
              touched={touched}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            <div className="footer">
              <Button
                className="toolbar-button-small primary"
                disabled={isPristine || hasErrors}
                type="submit"
                icon="save"
                text="Save"
              />
              <Button
                className="toolbar-button-small secondary"
                icon="times"
                onClick={onBack}
                type="button"
                text="Cancel"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateUser;
