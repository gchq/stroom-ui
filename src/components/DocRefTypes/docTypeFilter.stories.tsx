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

import StroomDecorator from "../../testing/storybook/StroomDecorator";
import { storiesOf } from "@storybook/react";

import DocTypeFilters from "./DocTypeFilters";
import DocRefTypePicker from "./DocRefTypePicker";

import "../../styles/main.css";
import useForm from "../../lib/useForm";
import JsonDebug from "../../testing/JsonDebug";
import { addThemedStories } from "../../lib/themedStoryGenerator";

interface FormValues {
  docRefType?: string;
  multipleDocRefTypes: Array<string>;
}
const initialValues: FormValues = {
  docRefType: undefined,
  multipleDocRefTypes: []
};

const TestForm = () => {
  const { value, generateControlledInputProps } = useForm<FormValues>({
    initialValues
  });

  const docRefTypeProps = generateControlledInputProps<string>("docRefType");
  const multipleDocRefTypeProps = generateControlledInputProps<Array<string>>(
    "multipleDocRefTypes"
  );

  return (
    <form>
      <div>
        <label>Chosen Doc Type</label>
        <DocRefTypePicker {...docRefTypeProps} />
        <label>Chosen Doc Types</label>
        <DocTypeFilters {...multipleDocRefTypeProps} />
      </div>

      <JsonDebug value={value} />
    </form>
  );
};

const stories = storiesOf("Pickers/Doc Ref Type", module).addDecorator(
  StroomDecorator
);

addThemedStories(stories, <TestForm />);
