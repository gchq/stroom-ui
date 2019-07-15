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
import IndexVolumesSection from "../IndexVolumesSection";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import JsonDebug from "testing/JsonDebug";
import {
  indexVolume01,
  indexVolumeGroup01,
  indexVolumeGroup02,
  indexVolumeGroupMemberships,
  indexVolume02,
  indexVolume03,
} from "../testData";
import {
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
} from "../indexVolumeGroupApi";
import { useCallback } from "react";
import { IndexVolume } from "../indexVolumeApi";
const stories = storiesOf("Sections/Index Volumes 2", module);

const TestHarness: React.FunctionComponent = () => {
  var initialGroups = [indexVolumeGroup01, indexVolumeGroup02];
  var initialVolumes = [indexVolume01, indexVolume02, indexVolume03];

  const [memberships, setMemberships] = React.useState<
    IndexVolumeGroupMembership[]
  >(indexVolumeGroupMemberships);

  const [groups, setGroups] = React.useState<IndexVolumeGroup[]>(initialGroups);
  const handleAddGroup = useCallback(() => {
    const newGroup: IndexVolumeGroup = {
      name: "New group",
      createTimeMs: -1,
      createUser: "",
      updateTimeMs: -1,
      updateUser: "",
    };
    setGroups([...groups, newGroup]);
  }, [setGroups, groups]);

  const [volumes, setVolumes] = React.useState<IndexVolume[]>(initialVolumes);
  const handleAddVolume = useCallback(
    (destinationGroupName: string) => {
      const newVolumeId = "-1";
      const newVolume: IndexVolume = {
        id: newVolumeId,
        path: "",
        nodeName: "New volume",
        bytesLimit: -1,
        bytesUsed: -1,
        bytesFree: -1,
        bytesTotal: -1,
        statusMs: -1,
        createTimeMs: -1,
        createUser: "",
        updateTimeMs: -1,
        updateUser: "",
      };
      const newMembership: IndexVolumeGroupMembership = {
        volumeId: newVolumeId,
        groupName: destinationGroupName,
      };
      setMemberships([...memberships, newMembership]);
      setVolumes([...volumes, newVolume]);
    },
    [setVolumes, setMemberships],
  );
  return (
    <div>
      <IndexVolumesSection
        indexVolumeGroups={groups}
        indexVolumes={volumes}
        indexVolumeGroupMemberships={memberships}
        onGroupAdd={handleAddGroup}
        onGroupChange={() => console.log("onGroupChange")}
        onGroupDelete={() => console.log("onGroupDelete")}
        onVolumeAdd={handleAddVolume}
        onVolumeChange={() => console.log("onVolumeChange")}
        onVolumeDelete={() => console.log("onVolumeDelete")}
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
      />

      <JsonDebug value={{ groups }} />
      <JsonDebug value={{ memberships }} />
      <JsonDebug value={{ volumes }} />
    </div>
  );
};

addThemedStories(stories, () => <TestHarness />);
