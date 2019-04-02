import * as React from "react";

import { storiesOf } from "@storybook/react";

import ModeOptionButtons from "./ModeOptionButtons";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import { SearchMode } from "./types";
import JsonDebug from "src/testing/JsonDebug";

const TestHarness = () => {
  const [mode, setMode] = React.useState<SearchMode>(SearchMode.GLOBAL_SEARCH);

  return (
    <div>
      <ModeOptionButtons switchMode={setMode} />
      <JsonDebug value={{ mode }} />
    </div>
  );
};

const stories = storiesOf("Doc Ref/App Search Bar/Mode Option", module);

addThemedStories(stories, () => <TestHarness />);
