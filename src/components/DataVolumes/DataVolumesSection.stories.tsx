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
import DataVolumesSection from "./DataVolumesSection";
import DataVolume from "./DataVolume"
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import JsonDebug from "testing/JsonDebug";

import { useCallback } from "react";

const volume01: DataVolume = {
  streamId: "1",
  volumePath: "/some/path/1",
  createTimeMs: -1,
  createUser: "",
  updateTimeMs: -1,
  updateUser: ""
}

const volume02: DataVolume = {
  streamId: "2",
  volumePath: "/some/path/2",
  createTimeMs: -1,
  createUser: "",
  updateTimeMs: -1,
  updateUser: ""
}

const volume03: DataVolume = {
  streamId: "3",
  volumePath: "/some/path/3",
  createTimeMs: -1,
  createUser: "",
  updateTimeMs: -1,
  updateUser: ""
}


const stories = storiesOf("Sections/Data Volumes/DataVolumesSection", module);

const TestHarness: React.FunctionComponent = () => {
  // var initialVolumes = [indexVolume01, indexVolume02, indexVolume03];

  // const [volumes, setVolumes] = React.useState<IndexVolume[]>(initialVolumes);
  // const handleAddVolume = useCallback(
  //   (indexVolumeGroupName: string) => {
  //     const newVolumeId = "-1";
  //     const newVolume: IndexVolume = {
  //       id: newVolumeId,
  //       indexVolumeGroupName,
  //       path: "",
  //       nodeName: "New volume",
  //       bytesLimit: -1,
  //       bytesUsed: -1,
  //       bytesFree: -1,
  //       bytesTotal: -1,
  //       statusMs: -1,
  //       createTimeMs: -1,
  //       createUser: "",
  //       updateTimeMs: -1,
  //       updateUser: "",
  //     };
  //     setVolumes([...volumes, newVolume]);
  //   },
  //   [setVolumes, volumes],
  // );

  const handleDeleteVolume = useCallback(
    (volumeId: string) => {
      setVolumes(volumes.filter(v => v.id !== volumeId));
    },
    [setVolumes, volumes],
  );

  const handleVolumeChange = useCallback(
    (dataVolume: DataVolume) => {
      const otherVolumes = volumes.filter(v => v.id !== dataVolume.id);
      setVolumes([...otherVolumes, dataVolume]);
    },
    [volumes],
  );

  return (
    <div>
      <DataVolumesSection
        volumes={volumes}
        onVolumeAdd={handleAddVolume}
        onVolumeChange={handleVolumeChange}
        onVolumeDelete={handleDeleteVolume}
      />

      <JsonDebug value={{ volumes }} />
    </div>
  );
};

addThemedStories(stories, () => <TestHarness />);
