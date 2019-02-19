import { useEffect } from "react";

import { StoreState as ElementsStoreState } from "./elementReducer";
import useElementsApi from "../useElementsApi";
import useReduxState from "../../../lib/useReduxState";

export const useElements = (): ElementsStoreState => {
  const elementsApi = useElementsApi();

  useEffect(() => {
    elementsApi.fetchElements();
    elementsApi.fetchElementProperties();
  }, []);

  const { elements } = useReduxState(({ pipelineEditor: { elements } }) => ({
    elements
  }));

  return elements;
};

export default useElements;
