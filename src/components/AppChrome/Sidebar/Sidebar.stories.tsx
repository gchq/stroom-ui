import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import Sidebar from "./Sidebar";

addStory("App Chrome", "Sidebar", module, () => <Sidebar activeMenuItem="welcome" />);
