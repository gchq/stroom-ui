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

import IndexVolumeGroupEditor from "./IndexVolumeGroupEditor";
import { IndexVolumeGroup } from "./indexVolumeGroupApi";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import { IndexVolume } from "./indexVolumeApi";

const stories = storiesOf(
  "Sections/Index Volumes 2/IndexVolumeGroupEditor",
  module,
);

const indexVolumeGroup: IndexVolumeGroup = {
  name: "Index Volume Group 1",
  createTimeMs: Date.now(),
  updateTimeMs: Date.now(),
  createUser: "Test user",
  updateUser: "Updating user",
};

const indexVolume01: IndexVolume = {
  nodeName: "Index volume name",
  path: "/some/amazing/pathj",
  bytesFree: 1,
  bytesLimit: 1,
  bytesTotal: 1,
  bytesUsed: 1,
  createTimeMs: Date.now(),
  createUser: "Creating user",
  id: "1",
  statusMs: Date.now(),
  updateTimeMs: Date.now(),
  updateUser: "Updating user",
};

addThemedStories(stories, () => (
  <div style={{ padding: "1em" }}>
    <IndexVolumeGroupEditor
      indexVolumeGroup={indexVolumeGroup}
      indexVolumes={[indexVolume01]}
    />
  </div>
));
