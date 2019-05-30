import * as React from "react";
import { addStory } from "testing/storybook/themedStoryGenerator";
import fullTestData from "testing/data";
import MetaRelations from "./MetaRelations";
import { MetaRow } from "../types";

const metaRow: MetaRow = fullTestData.dataList.streamAttributeMaps[0];

addStory("Sections/Meta Browser", "Relations", module, () => <MetaRelations metaRow={metaRow} />);
