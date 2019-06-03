import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import ActivityEditor from "./ActivityEditor";
import fullTestData from "testing/data";

const TestHarness: React.FunctionComponent = () => (
  <ActivityEditor
    activity={fullTestData.activity.activityList[0]}
    editorBody={fullTestData.activity.config.editorBody}
  />
);

addStory("Sections/Activity", "Editor", module, () => <TestHarness />);
