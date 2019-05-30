import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import MetaTable, { useTable } from "./MetaTable";
import fullTestData from "testing/data";

const TestHarness: React.FunctionComponent = () => {
  const props = useTable(fullTestData.dataList);

  return <MetaTable {...props} />;
};

addStory("Sections/Meta Browser", "Meta Table", module, () => <TestHarness />);
