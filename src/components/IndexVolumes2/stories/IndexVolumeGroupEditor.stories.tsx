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

import IndexVolumeGroupEditor from "../IndexVolumeGroupEditor";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";

import {
  indexVolume01,
  indexVolumeGroup01,
  indexVolumeGroup02,
  indexVolumeGroupMemberships,
  indexVolume02,
  indexVolume03,
} from "../testData";

const stories = storiesOf(
  "Sections/Index Volumes 2/IndexVolumeGroupEditor",
  module,
);

addThemedStories(stories, () => (
  <div style={{ padding: "1em" }}>
    <IndexVolumeGroupEditor
      indexVolumeGroups={[indexVolumeGroup01, indexVolumeGroup02]}
      indexVolumeGroupMemberships={indexVolumeGroupMemberships}
      indexVolumes={[indexVolume01, indexVolume02, indexVolume03]}
      onVolumeMove={(
        volumeId,
        sourceVolumeGroupName,
        destinationVolumeGroupName,
      ) => {
        console.log("onVolumeMove");
        var membership = indexVolumeGroupMemberships.find(
          ivgm => ivgm.volumeId === volumeId,
        );
        membership.groupName = destinationVolumeGroupName;
      }}
      onGroupAdd={() => console.log("onGroupAdd")}
      onVolumeAdd={() => console.log("onVolumeAdd")}
      onVolumeDelete={() => console.log("onVolumeDelete")}
    />
  </div>
));
