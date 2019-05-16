import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import fullTestData from "testing/data";
import StreamAttributes from "./StreamAttributes";
import { DataRow } from "components/DataViewer/types";

const dataRow: DataRow = fullTestData.dataList.streamAttributeMaps[0];

const stories = storiesOf(
  "Sections/Data Viewer/Details Tabs/Stream Attributes",
  module,
);

addThemedStories(stories, () => <StreamAttributes dataRow={dataRow} />);
