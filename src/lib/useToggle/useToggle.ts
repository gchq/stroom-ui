import * as React from "react";

interface UseToggle {
  value: boolean;
  toggle: () => void;
}

const useToggle = (defaultValue: boolean = false): UseToggle => {
  const [value, setValue] = React.useState<boolean>(defaultValue);
  const toggle = React.useCallback(() => {
    setValue(!value);
  }, [value, setValue]);

  return {
    value,
    toggle,
  };
};

export default useToggle;
