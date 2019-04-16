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

import UserModalPicker, { useDialog } from "./UserModalPicker";
import Button from "src/components/Button";
import JsonDebug from "src/testing/JsonDebug";
import fullTestData from "src/testing/data";

const stories = storiesOf(
  "Sections/Authorisation Manager/User Picker Modal",
  module,
);

const TestHarness: React.FunctionComponent = () => {
  const [pickedUser, setPickedUser] = React.useState<string | undefined>(
    undefined,
  );

  const { userNamesToFilterOut, valuesToFilterOut } = React.useMemo(() => {
    let usersToFilterOut = fullTestData.usersAndGroups.users.slice(0, 3);
    let valuesToFilterOut = usersToFilterOut.map(u => u.uuid);
    let userNamesToFilterOut = usersToFilterOut.map(u => u.name);
    return {
      userNamesToFilterOut,
      valuesToFilterOut,
    };
  }, []);
  const { componentProps, showDialog } = useDialog({
    isGroup: undefined,
    onConfirm: setPickedUser,
    valuesToFilterOut,
  });

  return (
    <div>
      <Button text="Show Dialog" onClick={showDialog} />
      <JsonDebug value={{ pickedUser, userNamesToFilterOut }} />
      <UserModalPicker {...componentProps} />
    </div>
  );
};

addThemedStories(stories, () => <TestHarness />);
