import * as React from "react";
import CurrentActivityContext, {
  CurrentActivityContextValue,
} from "./CurrentActivityContext";
import { Activity } from "./types";
import useApi from "./useApi";

const CurrentActivityContextProvider: React.FunctionComponent = ({
  children,
}) => {
  // Get the API object the provides the function that returns the promise
  const { getCurrentActivity, setCurrentActivity } = useApi();

  // Declare the React state object to hold the response from the REST API
  const [currentActivity, setCurrentActivityState] = React.useState<Activity>({
    userId: "TBD",
    properties: [
      {
        id: "prop1",
        name: "name1",
        value: "value1",
        showInSelection: true,
        showInList: true,
      },
      {
        id: "prop2",
        name: "name2",
        value: "value2",
        showInSelection: true,
        showInList: true,
      },
    ],
  });

  const refreshCurrentActivity = React.useCallback(() => {
    getCurrentActivity().then(setCurrentActivityState);
  }, [setCurrentActivityState, getCurrentActivity]);

  const _setCurrentActivity = React.useCallback(
    (activityId: string) => {
      setCurrentActivity(activityId).then(setCurrentActivityState);
    },
    [setCurrentActivity, setCurrentActivityState],
  );

  // Use an effect to set the current activity state when the component is mounted
  React.useEffect(() => {
    refreshCurrentActivity();
  }, [refreshCurrentActivity]);

  const contextValue: CurrentActivityContextValue = {
    currentActivity,
    setCurrentActivity: _setCurrentActivity,
    refreshCurrentActivity,
  };

  return (
    <CurrentActivityContext.Provider value={contextValue}>
      {children}
    </CurrentActivityContext.Provider>
  );
};

export default CurrentActivityContextProvider;
