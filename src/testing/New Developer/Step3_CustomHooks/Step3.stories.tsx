import * as React from "react";

import { addStory } from "testing/storybook/themedStoryGenerator";
import Step3 from "./Step3";

addStory("New Developer", "Step 3", module, () => <Step3 />);
