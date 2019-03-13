import * as React from "react";
import { storiesOf } from "@storybook/react";

import { addThemedStories } from "../../lib/themedStoryGenerator";
import Loader from "./Loader";

import "../../styles/main.css";

const stories = storiesOf("General Purpose/Loader", module);

addThemedStories(stories, <Loader message="Stuff is loading" />);
