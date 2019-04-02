import * as React from "react";

import useApi from "./useApi";
import {
  ElementDefinitions,
  ElementPropertiesByElementIdType,
} from "src/types";

interface UseElements {
  elementDefinitions: ElementDefinitions;
  elementProperties: ElementPropertiesByElementIdType;
}

/**
 * Convenience hook for using the Element Definitions and the Element Property Definitions
 * from the server. Handles the link between the REST API and the Redux state.
 */
const useElements = (): UseElements => {
  const { fetchElements, fetchElementProperties } = useApi();
  const [elementDefinitions, setElementDefinitions] = React.useState<
    ElementDefinitions
  >([]);
  const [elementProperties, setElementProperties] = React.useState<
    ElementPropertiesByElementIdType
  >({});

  React.useEffect(() => {
    fetchElements().then(setElementDefinitions);
    fetchElementProperties().then(setElementProperties);
  }, [
    fetchElements,
    fetchElementProperties,
    setElementDefinitions,
    setElementProperties,
  ]);

  return {
    elementDefinitions,
    elementProperties,
  };
};

export default useElements;
