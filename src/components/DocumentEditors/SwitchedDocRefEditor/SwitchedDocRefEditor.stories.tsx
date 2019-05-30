import * as React from "react";

import fullTestData from "testing/data";
import { docRefEditorClasses } from "./types";
import { addStory } from "testing/storybook/themedStoryGenerator";
import SwitchedDocRefEditor from ".";

Object.keys(docRefEditorClasses).forEach(docRefType => {
  // 'System' will not have a list in documents.
  if (
    !!fullTestData.documents[docRefType] &&
    fullTestData.documents[docRefType].length > 0
  ) {
    let uuid: string = fullTestData.documents[docRefType][0].uuid;
    addStory("Document Editors", `${docRefType}`, module, () => <SwitchedDocRefEditor docRefUuid={uuid} />);
  }
});
