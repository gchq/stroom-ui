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

import ExpressionBuilder from "./ExpressionBuilder";

import { testExpression, testDataSource, simplestExpression } from "./test";

import { ExpressionOperatorWithUuid } from "src/types";

const PopulatedEditable = () => {
  const [expression, onChange] = useState<ExpressionOperatorWithUuid>(
    testExpression
  );

  return (
    <ExpressionBuilder
      expression={expression}
      onChange={onChange}
      showModeToggle
      editMode
      dataSource={testDataSource}
    />
  );
};

const PopulatedReadOnly = () => {
  const [expression, onChange] = useState<ExpressionOperatorWithUuid>(
    testExpression
  );

  return (
    <ExpressionBuilder
      onChange={onChange}
      expression={expression}
      dataSource={testDataSource}
    />
  );
};

const SimplestEditable = () => {
  const [expression, onChange] = useState<ExpressionOperatorWithUuid>(
    simplestExpression
  );

  return (
    <ExpressionBuilder
      onChange={onChange}
      expression={expression}
      showModeToggle
      dataSource={testDataSource}
    />
  );
};

const MissingDataSource = () => {
  const [expression, onChange] = useState<ExpressionOperatorWithUuid>(
    testExpression
  );

  return (
    <ExpressionBuilder
      onChange={onChange}
      expression={expression}
      dataSource={testDataSource}
    />
  );
};

const HideModeToggle = () => {
  const [expression, onChange] = useState<ExpressionOperatorWithUuid>(
    testExpression
  );

  return (
    <ExpressionBuilder
      onChange={onChange}
      expression={expression}
      showModeToggle={false}
      dataSource={testDataSource}
    />
  );
};

const HideModeButEdit = () => {
  const [expression, onChange] = useState<ExpressionOperatorWithUuid>(
    testExpression
  );

  return (
    <ExpressionBuilder
      onChange={onChange}
      expression={expression}
      showModeToggle={false}
      editMode
      dataSource={testDataSource}
    />
  );
};

storiesOf("Expression/Builder", module)
  .add("Populated Editable", PopulatedEditable)
  .add("Populated ReadOnly", PopulatedReadOnly)
  .add("Simplest Editable", SimplestEditable)
  .add("Missing Data Source (read only)", MissingDataSource)
  .add("Hide mode toggle", HideModeToggle)
  .add("Hide mode toggle but be in edit mode", HideModeButEdit);
