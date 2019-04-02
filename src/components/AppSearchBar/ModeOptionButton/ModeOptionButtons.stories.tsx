import * as React from "react";
import { useState } from "react";

import { storiesOf } from "@storybook/react";

import ModeOptionButtons from "./ModeOptionButtons";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import { SearchMode } from "./types";
import JsonDebug from "src/testing/JsonDebug";

const stories = storiesOf("Doc Ref/App Search Bar/Mode Option", module);

addThemedStories(stories, () => {
  const [mode, setMode] = useState<SearchMode>(SearchMode.GLOBAL_SEARCH);

  return (
    <div>
      <ModeOptionButtons switchMode={setMode} />
      <JsonDebug value={{ mode }} />
    </div>
  );
});
