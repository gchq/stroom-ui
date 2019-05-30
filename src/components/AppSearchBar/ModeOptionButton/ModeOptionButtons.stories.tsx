import * as React from "react";

import ModeOptionButtons, { useModeOptionButtons } from "./ModeOptionButtons";
import { addStory } from "testing/storybook/themedStoryGenerator";
import JsonDebug from "testing/JsonDebug";

const TestHarness = () => {
  const { searchMode, componentProps } = useModeOptionButtons();

  return (
    <div>
      <ModeOptionButtons {...componentProps} />
      <JsonDebug value={{ searchMode }} />
    </div>
  );
};

addStory("App Search Bar", "Mode Option", module, () => <TestHarness />);
