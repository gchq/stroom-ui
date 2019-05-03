import * as React from "react";
import { KeyboardEventHandler } from "react";

interface KeyHandlersByKey {
  [key: string]: KeyboardEventHandler;
}

const useOnKeyDown = (handlers: KeyHandlersByKey): KeyboardEventHandler => {
  return (e: React.KeyboardEvent) => {
    const handler = handlers[e.key];

    if (!!handler) handler(e);
  };
};

export default useOnKeyDown;
