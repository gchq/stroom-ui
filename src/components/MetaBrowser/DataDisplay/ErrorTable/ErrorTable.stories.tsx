import * as React from "react";

import { addStory } from "testing/storybook/themedStoryGenerator";
import ErrorTable from "./ErrorTable";
import { errorData } from "testing/data/data";

addStory("Sections/Meta Browser/Data Display", "Error Table",
module, () => <ErrorTable errors={errorData.markers} />);
