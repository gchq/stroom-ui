import * as React from "react";
import * as uuidv4 from "uuid/v4";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import AddElementModal, { useDialog } from "./AddElementModal";
import Button from "src/components/Button";
import JsonDebug from "src/testing/JsonDebug";
import { NewElement } from "../types";
import useElements from "src/components/DocumentEditors/PipelineEditor/useElements";
import { ElementDefinition } from "src/components/DocumentEditors/PipelineEditor/useElements/types";
import Select from "react-select";

const PARENT_ID = uuidv4();

const TestHarness: React.FunctionComponent = () => {
  const { elementDefinitions } = useElements();
  const existingNames = React.useMemo(
    () => elementDefinitions.map(e => e.type),
    [elementDefinitions],
  );
  const [
    selectedElementDefinition,
    setSeletedElementDefinition,
  ] = React.useState<ElementDefinition>(elementDefinitions[0]);
  React.useEffect(() => {
    setSeletedElementDefinition(elementDefinitions[0]);
  }, [elementDefinitions]);
  const [newElement, setNewElement] = React.useState<NewElement | undefined>();
  const { componentProps, showDialog } = useDialog(setNewElement);

  const onClick = React.useCallback(() => {
    showDialog(PARENT_ID, selectedElementDefinition, existingNames);
  }, [showDialog]);

  return (
    <div>
      <Select
        options={elementDefinitions}
        value={selectedElementDefinition}
        onChange={x => setSeletedElementDefinition(x as ElementDefinition)}
        getOptionLabel={d => d.type}
      />
      <Button onClick={onClick} text="Show" />
      <JsonDebug
        value={{
          PARENT_ID,
          existingNames,
          selectedElementDefinition,
          newElement,
        }}
      />
      <AddElementModal {...componentProps} />
    </div>
  );
};

const stories = storiesOf("Document Editors/Pipeline/Add Element", module);

addThemedStories(stories, () => <TestHarness />);
