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

import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";

import UserPicker, { usePicker } from "./UserPicker";
import Button from "src/components/Button";
import JsonDebug from "src/testing/JsonDebug";
import fullTestData from "src/testing/data";

const stories = storiesOf("Sections/Authorisation Manager/User Picker", module);

const TestHarness: React.FunctionComponent = () => {
  const { userNamesToFilterOut, valuesToFilterOut } = React.useMemo(() => {
    let usersToFilterOut = fullTestData.usersAndGroups.users.slice(0, 3);
    let valuesToFilterOut = usersToFilterOut.map(u => u.uuid);
    let userNamesToFilterOut = usersToFilterOut.map(u => u.name);
    return {
      userNamesToFilterOut,
      valuesToFilterOut,
    };
  }, []);

  const { pickerProps, reset } = usePicker({
    isGroup: undefined,
    valuesToFilterOut,
  });
  const { value } = pickerProps;

  return (
    <div>
      <Button text="reset" onClick={reset} />
      <UserPicker {...pickerProps} />
      <JsonDebug value={{ value, userNamesToFilterOut }} />
    </div>
  );
};

addThemedStories(stories, () => <TestHarness />);
