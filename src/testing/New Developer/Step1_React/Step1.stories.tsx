import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";

import { Step1 } from "./Step1";

const stories = storiesOf("New Developer/Step 1 - React", module);

addThemedStories(stories, <Step1 />);
