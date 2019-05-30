import * as React from "react";

import { addStory } from "testing/storybook/themedStoryGenerator";
import JsonDebug from "testing/JsonDebug";

import { testDataSource as dataSource } from "../test";
import DataSourceFieldPicker from "./DataSourceFieldPicker";

const TestHarness: React.FunctionComponent = () => {
  const [value, onChange] = React.useState<string | undefined>(undefined);

  return (
    <div>
      <DataSourceFieldPicker {...{ dataSource, value, onChange }} />
      <JsonDebug value={{ value, dataSource }} />
    </div>
  );
};

addStory("Expression", "Data Source Field Picker", module, () => <TestHarness />);
