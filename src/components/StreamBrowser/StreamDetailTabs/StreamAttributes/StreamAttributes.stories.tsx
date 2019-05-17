import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import fullTestData from "testing/data";
import StreamAttributes from "./StreamAttributes";
import { StreamMetaRow } from "components/StreamBrowser/types";

const dataRow: StreamMetaRow = fullTestData.dataList.streamAttributeMaps[0];

const stories = storiesOf(
  "Sections/Stream Browser/Detail Tabs/Stream Attributes",
  module,
);

addThemedStories(stories, () => <StreamAttributes dataRow={dataRow} />);
