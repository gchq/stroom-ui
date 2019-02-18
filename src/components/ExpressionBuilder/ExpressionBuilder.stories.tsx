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
import { useEffect } from "react";

import { actionCreators } from "./redux";
import { ExpressionOperatorType } from "../../types";

import { storiesOf } from "@storybook/react";

import StroomDecorator from "../../lib/storybook/StroomDecorator";
import ExpressionBuilder, {
  Props as ExpressionBuilderProps
} from "./ExpressionBuilder";

import { testExpression, simplestExpression, testDataSource } from "./test";

import "../../styles/main.css";
import { useDispatch } from "redux-react-hook";

const { expressionChanged } = actionCreators;

interface Props extends ExpressionBuilderProps {
  testExpression: ExpressionOperatorType;
}

const TestExpressionBuilder = ({
  testExpression,
  expressionId,
  ...rest
}: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(expressionChanged(expressionId, testExpression));
  }, [testExpression]);

  return <ExpressionBuilder expressionId={expressionId} {...rest} />;
};

storiesOf("Expression/Builder", module)
  .addDecorator(StroomDecorator)
  .add("Populated Editable", () => (
    <TestExpressionBuilder
      testExpression={testExpression}
      showModeToggle
      editMode
      expressionId="populatedExEdit"
      dataSource={testDataSource}
    />
  ))
  .add("Populated ReadOnly", () => (
    <TestExpressionBuilder
      testExpression={testExpression}
      expressionId="populatedExRO"
      dataSource={testDataSource}
    />
  ))
  .add("Simplest Editable", () => (
    <TestExpressionBuilder
      testExpression={simplestExpression}
      showModeToggle
      expressionId="simplestEx"
      dataSource={testDataSource}
    />
  ))
  .add("Missing Data Source (read only)", () => (
    <TestExpressionBuilder
      testExpression={testExpression}
      expressionId="populatedExNoDs"
      dataSource={testDataSource}
    />
  ))
  .add("Missing Expression", () => (
    <ExpressionBuilder expressionId="missingEx" dataSource={testDataSource} />
  ))
  .add("Hide mode toggle", () => (
    <TestExpressionBuilder
      testExpression={testExpression}
      showModeToggle={false}
      expressionId="simplestEx"
      dataSource={testDataSource}
    />
  ))
  .add("Hide mode toggle but be in edit mode", () => (
    <TestExpressionBuilder
      testExpression={testExpression}
      showModeToggle={false}
      editMode
      expressionId="simplestEx"
      dataSource={testDataSource}
    />
  ));
