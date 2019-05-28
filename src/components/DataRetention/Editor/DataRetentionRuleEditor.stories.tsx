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

import { storiesOf } from "@storybook/react";
import * as React from "react";
import JsonDebug from "testing/JsonDebug";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import DataRetentionRuleEditor from "./DataRetentionRuleEditor";
import { DataRetentionRule } from "../types/DataRetentionRule";

const stories = storiesOf("Sections/DataRetention/Rule", module);

const rule1: DataRetentionRule = {
  ruleNumber: 1,
  name: "some rule name",
  enabled: true,
  age: 1,
  timeUnit: "Years",
  forever: false,
  expression: {
    op: "AND",
    children: [],
    enabled: true,
    type: "operator",
  },
};

addThemedStories(stories, () => {
  const [rule, setRule] = React.useState<DataRetentionRule>(rule1);
  return (
    <div>
      <DataRetentionRuleEditor rule={rule} onChange={rule => setRule(rule)} />
      <JsonDebug value={{ rule }} />
    </div>
  );
});
