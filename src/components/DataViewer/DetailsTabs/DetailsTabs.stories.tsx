import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import fullTestData from "testing/data";
import DetailsTabs from "./DetailsTabs";
import { DataRow } from "../types";

const data: DataRow = fullTestData.dataList.streamAttributeMaps[0];

const stories = storiesOf("Sections/Data/Details Tabs", module);

addThemedStories(stories, () => <DetailsTabs data={data} />);
