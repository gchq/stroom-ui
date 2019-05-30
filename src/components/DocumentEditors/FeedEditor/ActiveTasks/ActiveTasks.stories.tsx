import * as React from "react";
import fullTestData from "testing/data";
import { FeedDoc } from "components/DocumentEditors/useDocumentApi/types/feed";
import { addStory } from "testing/storybook/themedStoryGenerator";
import ActiveTasks from "./ActiveTasks";

const feed: FeedDoc = fullTestData.documents.Feed[0];

addStory("Document Editors/Feed", "Active Tasks", module, () => <ActiveTasks feedUuid={feed.uuid} />);
