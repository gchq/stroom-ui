import { useConfig } from "../../startup/config";

export default (): string | undefined => {
  const config = useConfig();

  if (config.isReady) {
    return config.values.stroomBaseServiceUrl;
  } else {
    return undefined;
  }
};
