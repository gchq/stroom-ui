import * as React from "react";
import { ActivityConfig } from "./types";
import useApi from "./useApi";

const useActivityConfig = (): ActivityConfig => {
  const [config, setConfig] = React.useState<ActivityConfig>(undefined);

  const { getConfig } = useApi();

  React.useEffect(() => {
    getConfig().then(setConfig);
  }, [getConfig, setConfig]);

  return config;
};

export default useActivityConfig;
