/*
 * Copyright 2018 Crown Copyright
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
import { storiesOf } from "@storybook/react";

import PermissionInheritancePicker from "./PermissionInheritancePicker";
import StroomDecorator from "../../lib/storybook/StroomDecorator";
import { addThemedStories } from "../../lib/themedStoryGenerator";
import "../../styles/main.css";
import useForm from "../../lib/useForm";
import { PermissionInheritance } from "src/types";
import JsonDebug from "../../lib/storybook/JsonDebug";

interface FormValues {
  permissionInheritance?: PermissionInheritance;
}
const initialValues: FormValues = {};

const TestForm = () => {
  const { currentValues, generateControlledInputProps } = useForm<FormValues>({
    initialValues
  });

  const permissionInheritanceProps = generateControlledInputProps<
    PermissionInheritance
  >("permissionInheritance");

  return (
    <form>
      <div>
        <label>Chosen Permission Inheritance</label>
        <PermissionInheritancePicker {...permissionInheritanceProps} />
      </div>
      <JsonDebug currentValues={currentValues} />
    </form>
  );
};

const stories = storiesOf(
  "Pickers/Permission Inheritance",
  module
).addDecorator(StroomDecorator);

addThemedStories(stories, <TestForm />);
