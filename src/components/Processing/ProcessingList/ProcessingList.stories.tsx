import * as React from "react";
import { useState, useEffect } from "react";

import { storiesOf } from "@storybook/react";
import ProcessingList from "./ProcessingList";
import { addThemedStories } from "../../../testing/storybook/themedStoryGenerator";
import { useStreamTasks } from "../../../api/streamTasks";
import JsonDebug from "../../../testing/JsonDebug";
import { StreamTaskType } from "src/types";

const TestHarness = () => {
  const streamTasksApi = useStreamTasks();
  const [selectedTrackers, setSelectedTrackers] = useState<
    Array<StreamTaskType>
  >([]);
  const { fetchTrackers } = streamTasksApi;
  useEffect(fetchTrackers, [fetchTrackers]);

  return (
    <div>
      <ProcessingList
        streamTasksApi={streamTasksApi}
        onSelectionChanged={setSelectedTrackers}
      />
      <JsonDebug value={{ selectedTrackers }} />
    </div>
  );
};

const stories = storiesOf("Sections/Processing/List", module);

addThemedStories(stories, TestHarness);
