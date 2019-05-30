/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react";

import DataDisplay from "./DataDisplay";
// import { errorData, eventData } from "testing/data/data/dataDisplay.testData";
import { addStory } from "testing/storybook/themedStoryGenerator";
import fullTestData from "testing/data";

const testError = fullTestData.dataList.streamAttributeMaps[0];
const testData = fullTestData.dataList.streamAttributeMaps[1];

addStory( "Sections/Meta Browser/Data Display", "Errors", module, () => <DataDisplay metaRow={testError} />);
addStory("Sections/Meta Browser/Data Display", "Events",module, () => <DataDisplay metaRow={testData} />);
