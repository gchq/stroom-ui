import * as React from "react";

import { storiesOf } from "@storybook/react";
import ExpressionTerm from ".";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";

import { testDataSource as dataSource } from "../test";
import { ExpressionTermType } from "../types";
import { getNewTerm } from "../expressionUtils";
import JsonDebug from "src/testing/JsonDebug";
import Button from "src/components/Button";

const stories = storiesOf("Expression/Term", module);

const newTerm: ExpressionTermType = getNewTerm();

const TestHarness: React.FunctionComponent = () => {
  const [value, onChange] = React.useState<ExpressionTermType>(newTerm);
  const [deleteRequest, showDeleteItemDialog] = React.useState<
    ExpressionTermType | undefined
  >(undefined);

  const resetDelete = React.useCallback(() => showDeleteItemDialog(undefined), [
    showDeleteItemDialog,
  ]);

  return (
    <div>
      <ExpressionTerm
        isEnabled
        {...{ dataSource, showDeleteItemDialog, value, onChange }}
      />
      <Button text="Reset Delete" onClick={resetDelete} />
      <JsonDebug value={{ value, deleteRequest }} />
    </div>
  );
};

addThemedStories(stories, () => <TestHarness />);
