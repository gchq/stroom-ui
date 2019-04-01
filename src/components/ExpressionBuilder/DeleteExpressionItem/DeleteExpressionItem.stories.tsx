import * as React from "react";
import { useState, useCallback } from "react";

import { storiesOf } from "@storybook/react";

import DeleteExpressionItem, { useDialog } from "./DeleteExpressionItem";
import JsonDebug from "src/testing/JsonDebug";
import Button from "../../Button";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";

const EXPRESSION_ITEM_ID = "SomeItemID";

const TestHarness = () => {
  const [itemDeleted, setItemDeleted] = useState<string | undefined>(undefined);
  const { showDialog, componentProps } = useDialog(setItemDeleted);

  const clearItemDeleted = useCallback(() => {
    setItemDeleted(undefined);
  }, [setItemDeleted]);

  const showDialogForTestItem = useCallback(() => {
    showDialog(EXPRESSION_ITEM_ID);
  }, [showDialog]);

  return (
    <div>
      <DeleteExpressionItem {...componentProps} />
      <Button text="Show Dialog" onClick={showDialogForTestItem} />
      <Button text="Reset" onClick={clearItemDeleted} />
      <JsonDebug value={{ itemDeleted }} />
    </div>
  );
};

const stories = storiesOf("Expression/Delete Expression Item", module);

addThemedStories(stories, () => <TestHarness />);
