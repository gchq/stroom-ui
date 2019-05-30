import * as React from "react";

import { addStory } from "../../storybook/themedStoryGenerator";

import Step2 from "./Step2";

addStory("New Developer", "Step 2", module, () => <Step2 />);
