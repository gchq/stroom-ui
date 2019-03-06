import * as React from "react";
import { useState, useCallback } from "react";
import { storiesOf } from "@storybook/react";

import DialogActionButtons from "./DialogActionButtons";
import StroomDecorator from "../../testing/storybook/StroomDecorator";

import "../../styles/main.css";

let TestHarness = () => {
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);
  const [hasCancelled, setHasCancelled] = useState<boolean>(false);

  const onCancel = useCallback(() => {
    setHasCancelled(true);
  }, []);
  const onConfirm = useCallback(() => {
    setHasConfirmed(true);
  }, []);
  const onReset = useCallback(() => {
    setHasConfirmed(false);
    setHasCancelled(false);
  }, []);

  return (
    <div>
      <DialogActionButtons onCancel={onCancel} onConfirm={onConfirm} />
      <form>
        <div>
          <label>Has Confirmed</label>
          <input type="checkbox" checked={hasConfirmed} onChange={() => {}} />
        </div>
        <div>
          <label>Has Cancelled</label>
          <input type="checkbox" checked={hasCancelled} onChange={() => {}} />
        </div>
      </form>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

storiesOf("General Purpose/Dialog Action Buttons", module)
  .addDecorator(StroomDecorator)
  .add("simple", () => <TestHarness />);
