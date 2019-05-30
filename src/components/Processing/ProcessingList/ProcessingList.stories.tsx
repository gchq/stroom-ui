import * as React from "react";

import ProcessingList from "./ProcessingList";
import { addStory } from "testing/storybook/themedStoryGenerator";
import useStreamTasks from "components/Processing/useStreamTasks";
import JsonDebug from "testing/JsonDebug";
import { StreamTaskType } from "../types";

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

addStory("Sections/Processing", "List", module, () => <TestHarness />);
