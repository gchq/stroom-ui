import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import EventView from "./EventView";
import { eventData } from "src/testing/data/data";

const stories = storiesOf("Sections/Data/Details/Event View", module);

addThemedStories(stories, () => {
  return <EventView events={eventData.data} />;
});
