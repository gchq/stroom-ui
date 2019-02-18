import { useEffect } from "react";

import { StoreState as ElementsStoreState } from "./elementReducer";
import {
  useFetchElements,
  useFetchElementProperties
} from "../elementResourceClient";
import useReduxState from "../../../lib/useReduxState";

export const useElements = (): ElementsStoreState => {
  const fetchElements = useFetchElements();
  const fetchElementProperties = useFetchElementProperties();
  useEffect(() => {
    fetchElements();
    fetchElementProperties();
  }, []);

  const { elements } = useReduxState(({ pipelineEditor: { elements } }) => ({
    elements
  }));

  return elements;
};

export default useElements;
