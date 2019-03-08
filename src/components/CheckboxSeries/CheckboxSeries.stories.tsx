import * as React from "react";
import { useState, useCallback } from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "../../lib/themedStoryGenerator";

import CheckboxSeries from "./CheckboxSeries";
import JsonDebug from "../../testing/JsonDebug";

const stories = storiesOf("General Purpose/Checkbox Series", module);

const AVAILABLE_VALUES: Array<string> = [
  "cereal",
  "toast",
  "sausages",
  "eggs",
  "hash browns"
];

const TestHarness: React.FunctionComponent = () => {
  const [breakfast, setBreakfast] = useState<Array<string>>([]);

  const addBreakfast = useCallback(t => setBreakfast(breakfast.concat([t])), [
    setBreakfast,
    breakfast
  ]);
  const removeBreakfast = useCallback(
    t => setBreakfast(breakfast.filter(b => b !== t)),
    [setBreakfast, breakfast]
  );

  return (
    <div>
      <h1>Breakfast Selection</h1>
      <CheckboxSeries
        allValues={AVAILABLE_VALUES}
        includedValues={breakfast}
        addValue={addBreakfast}
        removeValue={removeBreakfast}
      />

      <JsonDebug currentValues={breakfast} />
    </div>
  );
};

addThemedStories(stories, <TestHarness />);
