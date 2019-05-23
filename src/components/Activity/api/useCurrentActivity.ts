// Service layer to define state to store and invoke rest http functions to populate state

import * as React from "react";
import CurrentActivityContext, {
  CurrentActivityContextValue,
} from "./CurrentActivityContext";

const useCurrentActivity = (): CurrentActivityContextValue => {
  const context = React.useContext(CurrentActivityContext);

  // // Use an effect to set the build info state when the component is mounted
  // React.useEffect(() => {
  //   getCurrentActivity().then(setCurrentActivityState);
  // }, [setCurrentActivityState, getCurrentActivity]);

  return context;
};

export default useCurrentActivity;
