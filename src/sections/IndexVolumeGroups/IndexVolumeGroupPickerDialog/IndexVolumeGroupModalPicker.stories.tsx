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
import { useState, useMemo } from "react";

import { storiesOf } from "@storybook/react";

import IndexVolumeGroupModalPicker from "./IndexVolumeGroupModalPicker";
import { addThemedStories } from "../../../lib/themedStoryGenerator";

import "../../../styles/main.css";
import { useDialog } from "./IndexVolumeGroupModalPicker";
import Button from "../../../components/Button";
import JsonDebug from "../../../testing/JsonDebug";
import fullTestData from "../../../testing/data";

const TestModal: React.FunctionComponent = () => {
  const [picked, setPicked] = useState<string>("");

  const valuesToFilterOut = useMemo(
    () =>
      fullTestData.indexVolumesAndGroups.groups.slice(0, 1).map(g => g.name),
    []
  );

  const { componentProps, showDialog } = useDialog({
    onConfirm: setPicked,
    valuesToFilterOut
  });

  return (
    <div>
      <fieldset>
        <label>Picked Group Name</label>
        <p>{picked}</p>
      </fieldset>
      <Button text="Pick" onClick={showDialog} />
      <IndexVolumeGroupModalPicker {...componentProps} />
      <JsonDebug value={{ picked }} />
    </div>
  );
};

const storiesModal = storiesOf("Pickers/Index Volume Group (modal)", module);
addThemedStories(storiesModal, <TestModal />);
