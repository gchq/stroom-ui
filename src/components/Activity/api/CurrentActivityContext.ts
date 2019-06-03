import * as React from "react";
import { Activity } from "./types";

export interface CurrentActivityContextValue {
  currentActivity: Activity;
  setCurrentActivity: (activityId: string) => void;
  refreshCurrentActivity: () => void;
}

const CurrentActivityContext = React.createContext<CurrentActivityContextValue>(
  {
    currentActivity: {
      properties: [],
    },
    setCurrentActivity: () =>
      console.error("Unexpected call to default activity context"),
    refreshCurrentActivity: () =>
      console.error("Unexpected call to default activity context"),
  },
);

export default CurrentActivityContext;
