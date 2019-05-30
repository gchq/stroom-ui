import * as React from "react";
import { SearchToken } from "..";
import { addStory } from "testing/storybook/themedStoryGenerator";

addStory("Tokens", "Search", module, () => <SearchToken />);
