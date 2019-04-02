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

import IndexVolumeGroupModalPicker from "./IndexVolumeGroupModalPicker";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";

import { useDialog } from "./IndexVolumeGroupModalPicker";
import Button from "src/components/Button";
import JsonDebug from "src/testing/JsonDebug";
import fullTestData from "src/testing/data";

const TestHarness: React.FunctionComponent = () => {
  const [picked, setPicked] = React.useState<string>("");

  const valuesToFilterOut = React.useMemo(
    () =>
      fullTestData.indexVolumesAndGroups.groups.slice(0, 1).map(g => g.name),
    [],
  );

  const { componentProps, showDialog } = useDialog({
    onConfirm: setPicked,
    valuesToFilterOut,
  });

  return (
    <div>
      <Button text="Pick" onClick={showDialog} />
      <IndexVolumeGroupModalPicker {...componentProps} />
      <JsonDebug value={{ picked }} />
    </div>
  );
};

const stories = storiesOf("Pickers/Index Volume Group (modal)", module);
addThemedStories(stories, () => <TestHarness />);
