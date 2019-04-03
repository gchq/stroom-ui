import * as React from "react";

import { storiesOf } from "@storybook/react";
import ProcessingList from "./ProcessingList";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import useStreamTasks from "src/api/useStreamTasks";
import JsonDebug from "src/testing/JsonDebug";
import { StreamTaskType } from "src/types";

const stories = storiesOf("Sections/Processing/List", module);

const TestHarness = () => {
  const streamTasksApi = useStreamTasks();
  const [selectedTracker, setSelectedTracker] = React.useState<
    StreamTaskType | undefined
  >(undefined);
  const { fetchTrackers } = streamTasksApi;
  React.useEffect(fetchTrackers, [fetchTrackers]);

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

addThemedStories(stories, () => <TestHarness />);
