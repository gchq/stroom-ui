import * as React from "react";
import fullTestData from "testing/data";
import { FeedDoc } from "components/DocumentEditors/useDocumentApi/types/feed";
import { addStory } from "testing/storybook/themedStoryGenerator";
import FeedSettings from "./FeedSettings";

const feed: FeedDoc = fullTestData.documents.Feed[0];

addStory("Document Editors/Feed", "Settings", module, () => <FeedSettings feedUuid={feed.uuid} />);
