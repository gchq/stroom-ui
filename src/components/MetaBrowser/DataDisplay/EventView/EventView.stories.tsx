import * as React from "react";

import { addStory } from "testing/storybook/themedStoryGenerator";
import EventView from "./EventView";
import { eventData } from "testing/data/data";

addStory( "Sections/Meta Browser/Data Display", "Event View",
module, () => {
  return <EventView events={eventData.data} />;
});
