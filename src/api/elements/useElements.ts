import { useEffect } from "react";

import { StoreState as ElementsStoreState } from "./redux";
import useElementsApi from "./useApi";
import useReduxState from "../../lib/useReduxState";

export const useElements = (): ElementsStoreState => {
  const { fetchElements, fetchElementProperties } = useElementsApi();

  useEffect(() => {
    fetchElements();
    fetchElementProperties();
  }, [fetchElements, fetchElementProperties]);

  return useReduxState(({ elements }) => elements);
};

export default useElements;
