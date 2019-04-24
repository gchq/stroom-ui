import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import ErrorTable from ".";
import { errorData } from "testing/data/data";

const stories = storiesOf("Sections/Data Viewer/Details/Error Table", module);

addThemedStories(stories, () => <ErrorTable errors={errorData.markers} />);
