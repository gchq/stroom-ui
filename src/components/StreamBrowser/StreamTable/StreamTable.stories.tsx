import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import StreamTable from "./StreamTable";

const stories = storiesOf("Sections/Stream Browser/Stream Table", module);

addThemedStories(stories, () => <StreamTable />);
