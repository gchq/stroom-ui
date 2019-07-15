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
import {
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
} from "./indexVolumeGroupApi";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import { IndexVolume } from "./indexVolumeApi";

const stories = storiesOf(
  "Sections/Index Volumes 2/IndexVolumeGroupEditor",
  module,
);

const indexVolumeGroup01: IndexVolumeGroup = {
  name: "Index volume group 01",
  createTimeMs: Date.now(),
  updateTimeMs: Date.now(),
  createUser: "Test user",
  updateUser: "Updating user",
};

const indexVolumeGroup02: IndexVolumeGroup = {
  name: "Index volume group 02",
  createTimeMs: Date.now(),
  updateTimeMs: Date.now(),
  createUser: "Test user",
  updateUser: "Updating user",
};

const indexVolume01: IndexVolume = {
  nodeName: "Index volume name 01",
  path: "/some/amazing/path",
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

const indexVolume02: IndexVolume = {
  nodeName: "Index volume name 02",
  path: "/some/amazing/path",
  bytesFree: 1,
  bytesLimit: 1,
  bytesTotal: 1,
  bytesUsed: 1,
  createTimeMs: Date.now(),
  createUser: "Creating user",
  id: "2",
  statusMs: Date.now(),
  updateTimeMs: Date.now(),
  updateUser: "Updating user",
};

const indexVolume03: IndexVolume = {
  nodeName: "Index volume name 03",
  path: "/some/amazing/path",
  bytesFree: 1,
  bytesLimit: 1,
  bytesTotal: 1,
  bytesUsed: 1,
  createTimeMs: Date.now(),
  createUser: "Creating user",
  id: "3",
  statusMs: Date.now(),
  updateTimeMs: Date.now(),
  updateUser: "Updating user",
};

var indexVolumeGroupMemberships: IndexVolumeGroupMembership[] = [
  { volumeId: "1", groupName: "Index volume group 01" },
  { volumeId: "2", groupName: "Index volume group 01" },
  { volumeId: "3", groupName: "Index volume group 02" },
];

addThemedStories(stories, () => (
  <div style={{ padding: "1em" }}>
    <IndexVolumeGroupEditor
      indexVolumeGroups={[indexVolumeGroup01, indexVolumeGroup02]}
      indexVolumeGroupMemberships={indexVolumeGroupMemberships}
      indexVolumes={[indexVolume01, indexVolume02, indexVolume03]}
      onGroupChange={(
        volumeId,
        sourceVolumeGroupName,
        destinationVolumeGroupName,
      ) => {
        console.log("change");
        var membership = indexVolumeGroupMemberships.find(
          ivgm => ivgm.volumeId === volumeId,
        );
        membership.groupName = destinationVolumeGroupName;
      }}
    />
  </div>
));
