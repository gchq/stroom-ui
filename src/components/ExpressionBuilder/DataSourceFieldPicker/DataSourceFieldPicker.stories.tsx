import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import JsonDebug from "src/testing/JsonDebug";

import { testDataSource as dataSource } from "../test";
import DataSourceFieldPicker from "./DataSourceFieldPicker";

const stories = storiesOf("Expression/Data Source Field Picker", module);

const TestHarness: React.FunctionComponent = () => {
  const [value, onChange] = React.useState<string | undefined>(undefined);

  return (
    <div>
      <DataSourceFieldPicker {...{ dataSource, value, onChange }} />
      <JsonDebug value={{ value, dataSource }} />
    </div>
  );
};

addThemedStories(stories, () => <TestHarness />);
