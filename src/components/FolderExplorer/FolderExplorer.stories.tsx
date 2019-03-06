import * as React from "react";
import { storiesOf } from "@storybook/react";

import FolderExplorer from "./FolderExplorer";
import StroomDecorator from "../../testing/storybook/StroomDecorator";
import fullTestData from "../../testing/data";

import "../../styles/main.css";

const testFolder1 = fullTestData.documentTree.children![0];

storiesOf("Explorer/Folder", module)
  .addDecorator(StroomDecorator)
  .add("simple", () => <FolderExplorer folderUuid={testFolder1.uuid} />);
