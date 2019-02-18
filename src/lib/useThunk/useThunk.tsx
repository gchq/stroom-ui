import { useContext } from "react";
import { StoreContext } from "redux-react-hook";
import { GlobalStoreState } from "../../startup/reducers";
import { Dispatch } from "redux";

/**
 * This effectively converts a React Redux Thunk into a Hook.
 *
 * @param thunk The thunk that would normally be dispatched, it will be a function that
 * has been called with the domain specific arguments, to return a functio that accepts dispatch & getState.
 */
export const useThunk = function(
  thunk: (
    ...a: any[]
  ) => (dispatch: Dispatch, getState: () => GlobalStoreState) => any
): (...a: any[]) => void {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  return (...a: any[]) => {
    thunk(...a)(store.dispatch, store.getState);
  };
};

export default useThunk;
