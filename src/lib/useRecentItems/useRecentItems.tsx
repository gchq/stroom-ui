import * as React from "react";
import useLocalStorage, { storeObjectFactory } from "../useLocalStorage";
import { DocRefType, DocRefConsumer } from "src/types";

interface OutProps {
  recentItems: DocRefType[];
  addRecentItem: DocRefConsumer;
}

export const useRecentItems = (): OutProps => {
  const { setValue, value } = useLocalStorage<DocRefType[]>(
    "recent-items",
    [],
    storeObjectFactory(),
  );

  const addRecentItem = React.useCallback(
    (d: DocRefType) => setValue([d, ...value.filter(v => v.uuid !== d.uuid)]),
    [value, setValue],
  );

  return {
    recentItems: value,
    addRecentItem,
  };
};

export default useRecentItems;
