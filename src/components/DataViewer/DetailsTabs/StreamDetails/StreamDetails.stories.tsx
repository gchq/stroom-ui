import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import fullTestData from "testing/data";
import StreamDetails from "./StreamDetails";
import { DataRow } from "components/DataViewer/types";

const dataRow: DataRow = fullTestData.dataList.streamAttributeMaps[0];

const stories = storiesOf(
  "Sections/Data Viewer/Details Tabs/Stream Details",
  module,
);

addThemedStories(stories, () => <StreamDetails dataRow={dataRow} />);
