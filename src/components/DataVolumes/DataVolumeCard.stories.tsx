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
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import DataVolume from "./DataVolume";
import DataVolumeCard from "./DataVolumeCard";

const stories = storiesOf(
  "Sections/Data Volumes/DataVolumeCard",
  module,
);

const volume01: DataVolume = {
  streamId: "123",
  volumePath: "/some/amazing/path",
  createTimeMs: Date.now(),
  createUser: "Creating user",
  updateTimeMs: Date.now(),
  updateUser: "Updating user",
};

addThemedStories(stories, () => (
  <div style={{ padding: "1em" }}>
    <DataVolumeCard
      volume={volume01}
      onDelete={() => console.log("onDelete")}
      onChange={() => console.log("onChange")}
    />
  </div>
));
