import * as React from "react";
import { storiesOf } from "@storybook/react";

import FolderExplorer from "./FolderExplorer";

import fullTestData from "../../testing/data";



const testFolder1 = fullTestData.documentTree.children![0];

storiesOf("Explorer/Folder", module)
  
  .add("simple", () => <FolderExplorer folderUuid={testFolder1.uuid} />);
