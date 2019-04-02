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

import fullTestData from "src/testing/data";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";

import DocumentPermissionForUserEditor from "./DocumentPermissionForUserEditor";
import { DocRefType, User } from "src/types";

const testUser: User = fullTestData.usersAndGroups.users[0];
const testDocRef: DocRefType = fullTestData.documentTree.children![0];

const stories = storiesOf(
  "Sections/Authorisation Manager/Document Permission For User Editor",
  module,
);

addThemedStories(stories, () => (
  <DocumentPermissionForUserEditor
    userUuid={testUser.uuid}
    docRefUuid={testDocRef.uuid}
  />
));
