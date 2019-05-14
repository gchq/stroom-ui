import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import DataList from "./DataList";

const stories = storiesOf("Sections/Data Viewer/Data List", module);

addThemedStories(stories, () => <DataList />);
