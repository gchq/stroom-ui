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
import { useState, useCallback } from "react";

import { storiesOf } from "@storybook/react";

import { testDataSource as dataSource } from "../ExpressionBuilder/test";
import ExpressionSearchBar from "./ExpressionSearchBar";
import { addThemedStories } from "../../testing/storybook/themedStoryGenerator";

import "../../styles/main.css";
import JsonDebug from "../../testing/JsonDebug";
import Button from "../Button";
import { ExpressionOperatorWithUuid } from "../../types";

const TestHarness = () => {
  const [lastSearch, setLastSearch] = useState<
    ExpressionOperatorWithUuid | undefined
  >(undefined);

  return (
    <div>
      <ExpressionSearchBar
        onSearch={setLastSearch}
        initialSearchString="numberOfDoors=1 createUser=someGuy createTime>1234"
        dataSource={dataSource}
      />
      <Button
        text="Reset"
        onClick={useCallback(() => {
          setLastSearch(undefined);
        }, [setLastSearch])}
      />
      <JsonDebug value={{ lastSearch, dataSource }} />
    </div>
  );
};

const stories = storiesOf("Expression/Search Bar", module);

addThemedStories(stories, <TestHarness />);
