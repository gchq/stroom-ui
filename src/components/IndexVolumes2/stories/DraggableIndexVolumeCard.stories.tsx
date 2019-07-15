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
import { IndexVolume } from "../indexVolumeApi";
import DraggableIndexVolumeCard from "../DraggableIndexVolumeCard";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

const stories = storiesOf(
  "Sections/Index Volumes 2/DraggableIndexVolumeCard",
  module,
);

const indexVolume01: IndexVolume = {
  nodeName: "Index volume name",
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
const provided: DraggableProvided = {
  draggableProps: {
    "data-react-beautiful-dnd-draggable": "wat",
  },
  dragHandleProps: null,
  innerRef: () => {
    console.log("innerRef()");
  },
};

const snapshot: DraggableStateSnapshot = {
  isDragging: false,
  isDropAnimating: false,
};

addThemedStories(stories, () => (
  <div style={{ padding: "1em" }}>
    <DraggableIndexVolumeCard
      provided={provided}
      snapshot={snapshot}
      indexVolume={indexVolume01}
      onDelete={() => console.log("onDelete")}
      onChange={() => console.log("onChange")}
    />
  </div>
));
