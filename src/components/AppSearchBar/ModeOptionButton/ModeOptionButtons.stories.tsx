import * as React from "react";

import { storiesOf } from "@storybook/react";

import ModeOptionButtons, { useModeOptionButtons } from "./ModeOptionButtons";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import JsonDebug from "src/testing/JsonDebug";

const stories = storiesOf("Doc Ref/App Search Bar/Mode Option", module);

const TestHarness = () => {
  const { searchMode, componentProps } = useModeOptionButtons();

  return (
    <div>
      <ModeOptionButtons {...componentProps} />
      <JsonDebug value={{ searchMode }} />
    </div>
  );
};

addThemedStories(stories, () => <TestHarness />);
