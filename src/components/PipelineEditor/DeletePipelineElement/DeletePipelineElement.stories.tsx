import * as React from "react";
import { useState } from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";

import DeletePipelineElement, { useDialog } from ".";
import Button from "src/components/Button";
import JsonDebug from "src/testing/JsonDebug";

const stories = storiesOf("Pipeline/Delete Element", module);

let nextElementId = 12;

addThemedStories(stories, () => {
  const [elementDeleted, setElementDeleted] = useState<string | undefined>(
    undefined,
  );

  const { componentProps, showDialog } = useDialog(setElementDeleted);

  return (
    <div>
      <Button text="Show" onClick={() => showDialog(`${nextElementId++}`)} />
      <DeletePipelineElement {...componentProps} />
      <JsonDebug value={{ elementDeleted }} />
    </div>
  );
});
