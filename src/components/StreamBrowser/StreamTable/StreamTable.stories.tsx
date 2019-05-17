import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import StreamTable, { useTable } from "./StreamTable";
import fullTestData from "testing/data";

const TestHarness: React.FunctionComponent = () => {
  const props = useTable(fullTestData.dataList);

  return <StreamTable {...props} />;
};

const stories = storiesOf("Sections/Stream Browser/Stream Table", module);

addThemedStories(stories, () => <TestHarness />);
