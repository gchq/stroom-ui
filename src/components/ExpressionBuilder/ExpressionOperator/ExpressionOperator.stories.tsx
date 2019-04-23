import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import JsonDebug from "src/testing/JsonDebug";
import ExpressionOperator from ".";
import { getNewOperator } from "../expressionUtils";
import { ExpressionOperatorType } from "../types";
import { testDataSource as dataSource } from "../test";
import Button from "src/components/Button";
import useToggle from "src/lib/useToggle";
import { LineContainer } from "src/components/LineTo";

const stories = storiesOf("Expression/Operator", module);

const newOperator: ExpressionOperatorType = getNewOperator();

const TestHarness: React.FunctionComponent = () => {
  const [index, onIndexChange] = React.useState<number>(67);
  const [value, onValueChange] = React.useState<ExpressionOperatorType>(
    newOperator,
  );
  const [deletedId, onDelete] = React.useState<number | undefined>(undefined);

  const resetDelete = React.useCallback(() => onDelete(undefined), [onDelete]);
  const { value: isEnabled, toggle: toggleIsEnabled } = useToggle();

  const onChange = React.useCallback(
    (_index: number, _value: ExpressionOperatorType) => {
      onIndexChange(_index);
      onValueChange(_value);
    },
    [onIndexChange, onValueChange],
  );

  return (
    <LineContainer>
      <ExpressionOperator
        {...{ isEnabled, onDelete, dataSource, value, onChange }}
      />
      <Button text="Toggle Parent Enable" onClick={toggleIsEnabled} />
      <Button text="Reset Delete" onClick={resetDelete} />
      <JsonDebug value={{ index, value, isEnabled, deletedId }} />
    </LineContainer>
  );
};

addThemedStories(stories, () => <TestHarness />);
