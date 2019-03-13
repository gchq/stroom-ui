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



import { simplestExpression, testDataSource } from "../ExpressionBuilder/test";

import ExpressionSearchBar from "./ExpressionSearchBar";

import "../../styles/main.css";

storiesOf("Expression/Search Bar", module)
  
  .add("Basic", () => {
    const [expression, onExpressionChange] = useState(simplestExpression);

    return (
      <ExpressionSearchBar
        onSearch={e => console.log("Search called", e)}
        expression={expression}
        onExpressionChange={onExpressionChange}
        initialSearchString="foo1=bar1 foo2=bar2 foo3=bar3 someOtherKey=sometOtherValue"
        dataSource={testDataSource}
      />
    );
  });
