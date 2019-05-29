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

import { storiesOf } from "@storybook/react";

import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import DataRetentionSection from "./DataRetentionSection";
import { DataRetentionPolicy } from "../types/DataRetentionPolicy";
import { useState } from "react";
import JsonDebug from "testing/JsonDebug";

const stories = storiesOf("Sections/DataRetention/Main view", module);
const policy1: DataRetentionPolicy = {
  name: "rule2",
  type: "DataRetentionRules",
  rules: [
    {
      ruleNumber: 1,
      name: "First rule",
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
    },
    {
      ruleNumber: 2,
      name: "Second rule",
      enabled: true,
      age: 2,
      timeUnit: "Months",
      forever: false,
      expression: {
        op: "AND",
        children: [],
        enabled: true,
        type: "operator",
      },
    },
    {
      ruleNumber: 3,
      name: "Third rule",
      enabled: true,
      age: 1,
      timeUnit: "Weeks",
      forever: false,
      expression: {
        op: "AND",
        children: [],
        enabled: true,
        type: "operator",
      },
    },
  ],
  updateTime: "2019-01-01T01:01:01Z000",
  updateUser: "Some user",
  uuid: "blah-blah-uuid-blah",
  version: "1",
};
addThemedStories(stories, () => {
  const [policy, setPolicy] = useState(policy1);
  return (
    <div>
      <DataRetentionSection policy={policy} />
      <JsonDebug value={{ policy }} />
    </div>
  );;
});
