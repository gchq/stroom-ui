import * as React from "react";
import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import fullTestData from "testing/data";
import MetaDetailTabs from "./MetaDetailTabs";
import { StreamMetaRow } from "../types";

const data: StreamMetaRow = fullTestData.dataList.streamAttributeMaps[0];

const stories = storiesOf("Sections/Meta Browser/Detail Tabs/Tabs", module);

addThemedStories(stories, () => <MetaDetailTabs data={data} />);
