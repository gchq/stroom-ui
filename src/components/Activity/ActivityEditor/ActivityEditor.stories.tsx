import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import ActivityEditor from "./ActivityEditor";
import fullTestData from "testing/data";

const TestHarness: React.FunctionComponent = () => (
  <ActivityEditor activityId={fullTestData.activity.activityList[0].id} />
);

const stories = storiesOf("Sections/Activity/Editor", module);

addThemedStories(stories, () => <TestHarness />);
