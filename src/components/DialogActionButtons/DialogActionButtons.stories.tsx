import * as React from "react";
import { useState, useCallback } from "react";
import { storiesOf } from "@storybook/react";

import DialogActionButtons from "./DialogActionButtons";

storiesOf("General Purpose/Dialog Action Buttons", module).add("simple", () => {
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);
  const [hasCancelled, setHasCancelled] = useState<boolean>(false);

  const onCancel = useCallback(() => {
    setHasCancelled(true);
  }, [setHasCancelled]);
  const onConfirm = useCallback(() => {
    setHasConfirmed(true);
  }, [setHasConfirmed]);
  const onReset = useCallback(() => {
    setHasConfirmed(false);
    setHasCancelled(false);
  }, [setHasConfirmed, setHasCancelled]);

  return (
    <div>
      <DialogActionButtons onCancel={onCancel} onConfirm={onConfirm} />
      <form>
        <div>
          <label>Has Confirmed</label>
          <input type="checkbox" checked={hasConfirmed} />
        </div>
        <div>
          <label>Has Cancelled</label>
          <input type="checkbox" checked={hasCancelled} />
        </div>
      </form>
      <button onClick={onReset}>Reset</button>
    </div>
  );
});
