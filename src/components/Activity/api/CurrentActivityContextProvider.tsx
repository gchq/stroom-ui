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

  // Use an effect to set the build info state when the component is mounted
  React.useEffect(() => {
    getCurrentActivity().then(setCurrentActivityState);
  }, [setCurrentActivityState, getCurrentActivity]);

  const _setCurrentActivity = React.useCallback(
    (activity: Activity) => {
      // console.log("Setting current activity context", activity);
      setCurrentActivity(activity).then(setCurrentActivityState);
    },
    [setCurrentActivity, setCurrentActivityState],
  );

  const contextValue: CurrentActivityContextValue = {
    currentActivity,
    setCurrentActivity: _setCurrentActivity,
  };

  return (
    <CurrentActivityContext.Provider value={contextValue}>
      {children}
    </CurrentActivityContext.Provider>
  );
};

export default CurrentActivityContextProvider;
