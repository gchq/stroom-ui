import * as React from "react";

import { addStory } from "testing/storybook/themedStoryGenerator";
import NewIndexVolumeDialog, { useDialog } from ".";
import JsonDebug from "testing/JsonDebug";
import Button from "components/Button";
import { NewIndexVolume } from "components/IndexVolumes/api";

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

addStory("Sections/Index Volumes", "New Index Volume", module, () => <TestHarness />);
