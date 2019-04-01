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
import { useState } from "react";
import { storiesOf } from "@storybook/react";

import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import ConditionPicker from "./ConditionPicker";
import { ConditionType } from "src/types";

const stories = storiesOf("Pickers/Condition", module);

const B: React.FunctionComponent = () => {
  const [value, onChange] = useState<ConditionType | undefined>(undefined);

  return <ConditionPicker value={value} onChange={onChange} />;
};

addThemedStories(stories, () => <B />);
