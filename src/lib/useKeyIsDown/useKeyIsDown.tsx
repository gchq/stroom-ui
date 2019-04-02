import * as React from "react";
import { KeyDownState } from "./types";

export const DEFAULT_FILTERS = ["Control", "Shift", "Alt", "Meta"];

const useKeyIsDown = function(
  filters: string[] = DEFAULT_FILTERS,
): KeyDownState {
  const [keysDown, setKeysDown] = React.useState<KeyDownState>(
    filters.reduce((acc, c) => ({ ...acc, [c]: false }), {}),
  );

  React.useEffect(() => {
    const onkeydown = (e: KeyboardEvent) => {
      if (filters.indexOf(e.key) !== -1) {
        setKeysDown({ ...keysDown, [e.key]: true });
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", onkeydown);

    const onkeyup = (e: KeyboardEvent) => {
      if (filters.indexOf(e.key) !== -1) {
        setKeysDown({ ...keysDown, [e.key]: false });
        e.preventDefault();
      }
    };
    document.addEventListener("keyup", onkeyup);

    return () => {
      document.removeEventListener("keydown", onkeydown);
      document.removeEventListener("keyup", onkeyup);
    };
  }, []); // empty array prevents this code re-running for state changes

  return keysDown;
};

export default useKeyIsDown;
