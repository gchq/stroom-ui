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

import PermissionInheritancePicker from "./PermissionInheritancePicker";

import { addStory } from "testing/storybook/themedStoryGenerator";

import useForm from "lib/useForm";
import JsonDebug from "testing/JsonDebug";
import { PermissionInheritance } from "./types";

interface FormValues {
  permissionInheritance?: PermissionInheritance;
}
const initialValues: FormValues = {};

const TestHarness: React.FunctionComponent = () => {
  const { value, useControlledInputProps } = useForm<FormValues>({
    initialValues,
  });

  const permissionInheritanceProps = useControlledInputProps<
    PermissionInheritance
  >("permissionInheritance");

  return (
    <form>
      <div>
        <label>Chosen Permission Inheritance</label>
        <PermissionInheritancePicker {...permissionInheritanceProps} />
      </div>
      <JsonDebug value={value} />
    </form>
  );
};

addStory(  "Document Editors/Folder", "Permission Inheritance Picker",
module, () => <TestHarness />);
