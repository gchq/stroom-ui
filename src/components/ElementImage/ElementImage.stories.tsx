import * as React from "react";

import { storiesOf } from "@storybook/react";

import ElementImage from "./ElementImage";

import { addThemedStories } from "../../testing/storybook/themedStoryGenerator";

storiesOf("Pipeline/Element Image", module)
  .add("default (large)", () => <ElementImage icon="ElasticSearch.svg" />)
  .add("small", () => <ElementImage size="sm" icon="kafka.svg" />)
  .add("large", () => <ElementImage size="lg" icon="stream.svg" />);

const themedStories = storiesOf("Pipeline/Element Image/Themed", module);

addThemedStories(themedStories, <ElementImage size="lg" icon="kafka.svg" />);
