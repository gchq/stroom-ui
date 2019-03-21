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
  const [selectedTracker, setSelectedTracker] = useState<
    StreamTaskType | undefined
  >(undefined);
  const { fetchTrackers } = streamTasksApi;
  useEffect(fetchTrackers, [fetchTrackers]);

  return (
    <div className="fill-space">
      <ProcessingList
        streamTasksApi={streamTasksApi}
        onSelectionChanged={setSelectedTracker}
      />
      <JsonDebug value={{ selectedTracker }} />
    </div>
  );
};

const stories = storiesOf("Sections/Processing/List", module);

addThemedStories(stories, TestHarness);
