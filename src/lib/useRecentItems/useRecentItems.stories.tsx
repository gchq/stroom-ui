import * as React from "react";

import { storiesOf } from "@storybook/react";
import useRecentItems from ".";
import { useDocumentTree } from "src/api/explorer";
import { DocRefType, copyDocRef } from "src/types";
import { iterateNodes } from "../treeUtils";
import Button from "src/components/Button";

const TestHarness: React.FunctionComponent = () => {
  const { recentItems, addRecentItem } = useRecentItems();
  const { documentTree } = useDocumentTree();
  const documents = React.useMemo(() => {
    let d: DocRefType[] = [];
    iterateNodes(documentTree, (_, node) => d.push(node));
    return d;
  }, [documentTree]);
  const [documentIndex, setDocumentIndex] = React.useState<number>(0);
  const onClickAddNext = React.useCallback(() => {
    addRecentItem(documents[documentIndex]);
    setDocumentIndex((documentIndex + 1) % documents.length);
  }, [documents, documentIndex, addRecentItem, setDocumentIndex]);

  console.log("Rendering useRecentItems test Harness");

  return (
    <div>
      <Button onClick={onClickAddNext} text="Add" />
      <ul>
        {recentItems.map(recentItem => (
          <li key={recentItem.uuid}>
            {JSON.stringify(copyDocRef(recentItem))}
          </li>
        ))}
      </ul>
    </div>
  );
};

storiesOf("Custom Hooks/useRecentItems", module).add("test", () => (
  <TestHarness />
));
