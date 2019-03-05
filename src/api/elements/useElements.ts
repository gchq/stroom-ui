import { useEffect } from "react";

import { StoreState as ElementsStoreState } from "./redux";
import useElementsApi from "./useApi";
import useReduxState from "../../lib/useReduxState";

export const useElements = (): ElementsStoreState => {
  const elementsApi = useElementsApi();

  useEffect(() => {
    elementsApi.fetchElements();
    elementsApi.fetchElementProperties();
  }, []);

  const elements = useReduxState(({ elements }) => elements);

  return elements;
};

export default useElements;
