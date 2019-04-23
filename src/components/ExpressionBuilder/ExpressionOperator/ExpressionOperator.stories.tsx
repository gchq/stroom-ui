import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import JsonDebug from "src/testing/JsonDebug";
import ExpressionOperator from ".";
import { getNewOperator } from "../expressionUtils";
import { ExpressionOperatorType, ExpressionItem } from "../types";
import { dataSource } from "src/testing/data/data";
import Button from "src/components/Button";

const stories = storiesOf("Expression/Operator", module);

const DEFAULT_OPERATOR: ExpressionOperatorType = getNewOperator();

const TestHarness: React.FunctionComponent = () => {
  const [value, onChange] = React.useState<ExpressionOperatorType>(
    DEFAULT_OPERATOR,
  );
  const [deleteRequest, showDeleteItemDialog] = React.useState<
    ExpressionItem | undefined
  >(undefined);

  const resetDelete = React.useCallback(() => showDeleteItemDialog(undefined), [
    showDeleteItemDialog,
  ]);

  return (
    <div>
      <ExpressionOperator
        isEnabled
        {...{ showDeleteItemDialog, dataSource, value, onChange }}
      />
      <Button text="Reset Delete" onClick={resetDelete} />
      <JsonDebug value={{ value, deleteRequest }} />
    </div>
  );
};

addThemedStories(stories, () => <TestHarness />);
