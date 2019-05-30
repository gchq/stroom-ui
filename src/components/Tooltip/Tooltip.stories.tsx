import * as React from "react";

import { addStory } from "testing/storybook/themedStoryGenerator";

import Tooltip from "./Tooltip";

addStory("General Purpose", "Tooltip", module, () => (
  <Tooltip
    trigger={
      <button onClick={() => console.log("Clicked the tooltip button")}>
        Click Me
      </button>
    }
    content="Click this button, check the console"
  />
));
