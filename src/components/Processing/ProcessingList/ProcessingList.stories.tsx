import * as React from "react";
import { useState, useEffect } from "react";

import { storiesOf } from "@storybook/react";
import ProcessingList from "./ProcessingList";
import { addThemedStories } from "../../../testing/storybook/themedStoryGenerator";
import { useStreamTasks } from "../../../api/streamTasks";
import JsonDebug from "../../../testing/JsonDebug";

const TestHarness = () => {
  const streamTasksApi = useStreamTasks();
  const [selectedFilterId, setSelectedFilterId] = useState<number | undefined>(
    undefined
  );
  const { fetchTrackers } = streamTasksApi;
  useEffect(fetchTrackers, [fetchTrackers]);

  return (
    <div>
      <ProcessingList
        streamTasksApi={streamTasksApi}
        onSelection={setSelectedFilterId}
      />
      <JsonDebug value={{ selectedFilterId }} />
    </div>
  );
};

const stories = storiesOf("Sections/Processing/List", module);

addThemedStories(stories, TestHarness);
