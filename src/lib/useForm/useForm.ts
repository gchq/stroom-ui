import { useCallback, useEffect, useState } from "react";

export interface Form<T> {
  onUpdate: (updates: Partial<T>) => void;
  currentValues: Partial<T>;
}

export const useForm = function<T>(initialValue?: T): Form<T> {
  const [currentValues, setCurrentValues] = useState<Partial<T>>({});

  const onUpdate = useCallback(
    (newUpdates: Partial<T>) => {
      setCurrentValues({ ...currentValues, ...newUpdates });
    },
    [currentValues, setCurrentValues]
  );

  useEffect(() => {
    if (!!initialValue) {
      setCurrentValues(initialValue);
    }
  }, [initialValue]);

  return {
    onUpdate,
    currentValues
  };
};

export default useForm;
