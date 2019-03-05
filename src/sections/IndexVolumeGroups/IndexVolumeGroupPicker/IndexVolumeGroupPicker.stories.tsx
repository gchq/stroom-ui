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
import { useState } from "react";

import { storiesOf } from "@storybook/react";

import StroomDecorator from "../../../lib/storybook/StroomDecorator";

import IndexVolumeGroupPicker from "./IndexVolumeGroupPicker";
import IndexVolumeGroupModalPicker from "./IndexVolumeGroupModalPicker";
import { addThemedStories } from "../../../lib/themedStoryGenerator";

import "../../../styles/main.css";
import { useDialog } from "./IndexVolumeGroupModalPicker";
import Button from "../../../components/Button";
import useForm from "../../../lib/useForm";
import JsonDebug from "../../../lib/storybook/JsonDebug";

interface FormValues {
  groupName?: string;
}

const initialValues: FormValues = {};

const TestForm: React.FunctionComponent = () => {
  const { currentValues, generateControlledInputProps } = useForm({
    initialValues
  });

  const groupPickerProps = generateControlledInputProps<string>("groupName");

  return (
    <form>
      <div>
        <label>Chosen Index Volume Group</label>
        <IndexVolumeGroupPicker {...groupPickerProps} />
      </div>
      <JsonDebug currentValues={currentValues} />
    </form>
  );
};

const TestModal: React.FunctionComponent = () => {
  const [picked, setPicked] = useState<string>("");

  const { componentProps, showDialog } = useDialog({
    onConfirm: setPicked
  });

  return (
    <div>
      <fieldset>
        <label>Picked Group Name</label>
        <p>{picked}</p>
      </fieldset>
      <Button text="Pick" onClick={showDialog} />
      <IndexVolumeGroupModalPicker {...componentProps} />
    </div>
  );
};

const stories = storiesOf("Pickers/Index Volume Group", module).addDecorator(
  StroomDecorator
);
addThemedStories(stories, <TestForm />);

const storiesModal = storiesOf(
  "Pickers/Index Volume Group (modal)",
  module
).addDecorator(StroomDecorator);
addThemedStories(storiesModal, <TestModal />);
