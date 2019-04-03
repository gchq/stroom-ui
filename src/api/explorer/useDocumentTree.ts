import * as React from "react";
import DocumentTreeContext from "./DocumentTreeContext";

const useDocumentTree = () => {
  const context = React.useContext(DocumentTreeContext);
  const { fetchDocTree } = context;

  // Ensure the tree has been loaded
  React.useEffect(fetchDocTree, [fetchDocTree]);

  return context;
};

export default useDocumentTree;
