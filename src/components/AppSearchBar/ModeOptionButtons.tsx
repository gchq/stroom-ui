import * as React from "react";

import Button from "../Button";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum SearchMode {
  GLOBAL_SEARCH,
  NAVIGATION,
  RECENT_ITEMS
}

interface Props {
  switchMode: (m: SearchMode) => void;
}

interface ModeOption {
  mode: SearchMode;
  icon: IconProp;
  position: "left" | "middle" | "right";
}

const MODE_OPTIONS: Array<ModeOption> = [
  {
    mode: SearchMode.GLOBAL_SEARCH,
    icon: "search",
    position: "left"
  },
  {
    mode: SearchMode.NAVIGATION,
    icon: "folder",
    position: "middle"
  },
  {
    mode: SearchMode.RECENT_ITEMS,
    icon: "history",
    position: "right"
  }
];

const ModeOptionButtons = ({ switchMode }: Props) => (
  <React.Fragment>
    {MODE_OPTIONS.map(modeOption => (
      <Button
        key={modeOption.mode}
        icon={modeOption.icon}
        groupPosition={modeOption.position}
        onClick={e => switchMode(modeOption.mode)}
        onKeyDown={e => {
          if (e.key === " ") {
            switchMode(modeOption.mode);
          }
          e.stopPropagation();
        }}
      />
    ))}
  </React.Fragment>
);

export default ModeOptionButtons;
