import * as React from "react";

import { addStory } from "testing/storybook/themedStoryGenerator";
import Loader from "./Loader";

addStory("General Purpose", "Loader", module, () => <Loader message="Stuff is loading" />);
