import * as React from "react";
import JsonDebug from "testing/JsonDebug";
import { addStory } from "testing/storybook/themedStoryGenerator";
import AppSearchBarWidget from "./AppSearchBarWidget";
import { DocRefType } from "components/DocumentEditors/useDocumentApi/types/base";
import { useState } from "react";

addStory("Expression/Value Widgets", "Dictionary", module, () => {
  const [value, setValue] = useState<DocRefType>(undefined);
  return (
    <div>
      <AppSearchBarWidget onChange={setValue} value={value} />
      <JsonDebug value={value} />
    </div>
  );
});
