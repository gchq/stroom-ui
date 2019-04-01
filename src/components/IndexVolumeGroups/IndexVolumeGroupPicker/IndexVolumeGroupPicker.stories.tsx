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
import { useMemo } from "react";

import { storiesOf } from "@storybook/react";

import IndexVolumeGroupPicker from "./IndexVolumeGroupPicker";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";

import useForm from "src/lib/useForm";
import JsonDebug from "src/testing/JsonDebug";
import fullTestData from "src/testing/data";

interface FormValues {
  groupName?: string;
}

const initialValues: FormValues = {};

const TestForm: React.FunctionComponent = () => {
  const { value, useControlledInputProps } = useForm({
    initialValues
  });

  const valuesToFilterOut = useMemo(
    () =>
      fullTestData.indexVolumesAndGroups.groups.slice(0, 1).map(g => g.name),
    []
  );
  const groupPickerProps = useControlledInputProps<string>("groupName");

  return (
    <form>
      <div>
        <label>Chosen Index Volume Group</label>
        <IndexVolumeGroupPicker
          {...groupPickerProps}
          valuesToFilterOut={valuesToFilterOut}
        />
      </div>
      <JsonDebug value={value} />
    </form>
  );
};

const stories = storiesOf("Pickers/Index Volume Group", module);
addThemedStories(stories, () => <TestForm />);
