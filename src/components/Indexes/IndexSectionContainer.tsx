import * as React from "react";
import IndexSection from "./IndexSection";
import useIdFromPath from "lib/useIdFromPath";

const IndexSectionContainer: React.FunctionComponent = () => {
  // const { } = useIndexes();

  const indexId = useIdFromPath("indexing/indexes");
  console.log({ indexId });
  return (
    <IndexSection />
  )
};

export default IndexSectionContainer;
