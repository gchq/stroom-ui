import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import fullTestData from "testing/data";
import MetaDetails from "./MetaDetails";
import { MetaRow } from "components/MetaBrowser/types";

const dataRow: MetaRow = fullTestData.dataList.streamAttributeMaps[0];

addStory("Sections/Meta Browser/Detail Tabs/", "Meta Details", module, () => <MetaDetails dataRow={dataRow} />);
