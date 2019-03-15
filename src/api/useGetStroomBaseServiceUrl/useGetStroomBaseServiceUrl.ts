import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";

export default (): (() => string) => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Could not get Redux Store for processing API calls");
  }

  return useCallback(() => {
    const {
      config: {
        values: { stroomBaseServiceUrl }
      }
    } = store.getState();
    return stroomBaseServiceUrl;
  }, [store]);
};
