import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import fullTestData from "testing/data";
import MetaDetailTabs from "./MetaDetailTabs";
import { MetaRow } from "../types";

const data: MetaRow = fullTestData.dataList.streamAttributeMaps[0];

addStory("Sections/Meta Browser", "Detail Tabs", module, () => <MetaDetailTabs metaRow={data} />);
