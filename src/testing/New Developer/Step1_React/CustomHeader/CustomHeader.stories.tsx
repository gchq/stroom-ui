import * as React from "react";

import { addStory } from "../../../storybook/themedStoryGenerator";
import CustomHeader from ".";

addStory("New Developer/Step 1", "Custom Header", module, () => <CustomHeader title="Test Value" />);
