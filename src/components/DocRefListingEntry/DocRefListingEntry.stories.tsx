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
import { useState } from "react";
import { storiesOf } from "@storybook/react";

import StroomDecorator from "../../testing/storybook/StroomDecorator";
import fullTestData from "../../testing/data";
import useSelectableItemListing, {
  SelectionBehaviour
} from "../../lib/useSelectableItemListing";
import DocRefListingEntry from "./DocRefListingEntry";
import { DocRefType, DocRefWithLineage } from "../../types";

import "../../styles/main.css";
import { DocRefBreadcrumb } from "../DocRefBreadcrumb";
import { findItem } from "../../lib/treeUtils";

const testFolder = fullTestData.documentTree;
const testDocRef = fullTestData.documentTree.children![0].children![0];

interface Props {
  docRefs: Array<DocRefType>;
  dndIsOver?: boolean;
  dndCanDrop?: boolean;
  provideBreadcrumbs?: boolean;
}

let TestDocRefListingEntry = ({
  docRefs,
  dndIsOver,
  dndCanDrop,
  provideBreadcrumbs
}: Props) => {
  const [enteredFolder, enterFolder] = useState<DocRefType | undefined>(
    undefined
  );
  const [openedDocRef, openDocRef] = useState<DocRefType | undefined>(
    undefined
  );
  const [wentBack, setWentBack] = useState<boolean>(false);

  const goBack = () => setWentBack(true);
  const onClickClear = () => {
    enterFolder(undefined);
    openDocRef(undefined);
    setWentBack(false);
  };

  const docRefsWithLineage: Array<DocRefWithLineage> = docRefs
    .map(docRef => findItem(fullTestData.documentTree, docRef.uuid))
    .filter(d => d !== undefined)
    .map(d => d!);

  const {
    onKeyDownWithShortcuts,
    selectionToggled,
    selectedItems: selectedDocRefs,
    focussedItem: focussedDocRef
  } = useSelectableItemListing<DocRefType>({
    items: docRefs,
    openItem: openDocRef,
    getKey: d => d.uuid,
    enterItem: enterFolder,
    goBack,
    selectionBehaviour: SelectionBehaviour.MULTIPLE
  });

  return (
    <div style={{ width: "50%" }}>
      <div
        tabIndex={0}
        onKeyDown={onKeyDownWithShortcuts}
        style={{ borderStyle: "dashed", borderWidth: "2px" }}
      >
        {docRefsWithLineage &&
          docRefsWithLineage.map(docRefWithLineage => (
            <DocRefListingEntry
              key={docRefWithLineage.node.uuid}
              {...{
                docRef: docRefWithLineage.node,
                openDocRef,
                enterFolder,
                dndCanDrop,
                dndIsOver,
                selectionToggled,
                selectedDocRefs,
                focussedDocRef
              }}
            >
              {provideBreadcrumbs && (
                <DocRefBreadcrumb
                  docRefWithLineage={docRefWithLineage}
                  openDocRef={openDocRef}
                />
              )}
            </DocRefListingEntry>
          ))}
      </div>
      <div>
        <label>Entered Folder</label>
        <input readOnly value={!!enteredFolder ? enteredFolder.name : ""} />
      </div>
      <div>
        <label>Opened Doc Ref</label>
        <input readOnly value={!!openedDocRef ? openedDocRef.name : ""} />
      </div>
      <div>
        <label>Went Back</label>
        <input type="checkbox" readOnly checked={wentBack} />
      </div>
      <button onClick={onClickClear}>Clear</button>
    </div>
  );
};

storiesOf("Doc Ref/Listing Entry", module)
  .addDecorator(StroomDecorator)
  .add("docRef", () => <TestDocRefListingEntry docRefs={[testDocRef]} />)
  .add("docRef isOver canDrop", () => (
    <TestDocRefListingEntry docRefs={[testDocRef]} dndIsOver dndCanDrop />
  ))
  .add("docRef isOver cannotDrop", () => (
    <TestDocRefListingEntry
      docRefs={[testDocRef]}
      dndIsOver
      dndCanDrop={false}
    />
  ))
  .add("folder", () => (
    <TestDocRefListingEntry docRefs={testFolder.children!} />
  ))
  .add("folder (w/breadcrumbs)", () => (
    <TestDocRefListingEntry docRefs={testFolder.children!} provideBreadcrumbs />
  ));
