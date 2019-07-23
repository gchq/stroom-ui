import * as React from "react";

import { storiesOf } from "@storybook/react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import NewIndexVolumeDialog, { useDialog } from ".";
import JsonDebug from "testing/JsonDebug";
import Button from "components/Button";
import { NewIndexVolume } from "components/IndexVolumes/api";

const stories = storiesOf("Sections/Index Volumes/New Index Volume", module);

const TestHarness: React.FunctionComponent = () => {
  const [newVolume, setNewVolume] = React.useState<NewIndexVolume>({
    nodeName: "",
    path: "",
  });

  const { componentProps, showDialog } = useDialog(setNewVolume);

  return (
    <div>
      <Button onClick={showDialog} text="Show" />
      <NewIndexVolumeDialog {...componentProps} />
      <JsonDebug value={{ newVolume }} />
    </div>
  );
};

addThemedStories(stories, () => <TestHarness />);
