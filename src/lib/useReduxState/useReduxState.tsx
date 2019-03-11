import { useCallback } from "react";

import { useMappedState } from "redux-react-hook";
import { GlobalStoreState } from "../../startup/reducers";

/**
 * This is a convenience function to get Redux State Retrieval.
 * It seems as though you should only destructure in the mapper function.
 * If you must do actual processing on the state, do that is a separate stage
 * otherwise the memo-isation doesn't quite work...bit nasty
 */
export const useReduxState = function<T, State = GlobalStoreState>(
  mapper: (gss: State) => T,
  params: Array<any> = []
): T {
  const mapState = useCallback(mapper, params);
  return useMappedState(mapState);
};

export default useReduxState;
