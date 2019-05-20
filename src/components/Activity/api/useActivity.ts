import * as React from "react";
import { Activity } from "./types";
import useApi from "./useApi";

interface UseActivity {
  activity: Activity | undefined;
}

const useActivity = (activityId: string): UseActivity => {
  const [activity, setActivity] = React.useState<Activity | undefined>(
    undefined,
  );

  const { getActivity } = useApi();

  React.useEffect(() => {
    getActivity(activityId).then(setActivity);
  }, [activityId, getActivity, setActivity]);

  return { activity };
};

export default useActivity;
