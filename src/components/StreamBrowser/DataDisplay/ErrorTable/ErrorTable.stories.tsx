import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import ErrorTable from "./ErrorTable";
import { errorData } from "testing/data/data";

const stories = storiesOf(
  "Sections/Stream Browser/Details/Error Table",
  module,
);

addThemedStories(stories, () => <ErrorTable errors={errorData.markers} />);
