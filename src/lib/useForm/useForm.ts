import { useCallback, useEffect, useState } from "react";

interface InputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}
type InputPropsByType<T> = {
  text: InputPropsMap<T>;
  checkbox: InputPropsMap<T>;
};

type InputPropsMap<T> = { [s in keyof T]?: InputProps };
type InputPropsMapByType<T> = {
  text?: Array<keyof T>;
  checkbox?: Array<keyof T>;
};

export interface Form<T> {
  onUpdate: (updates: Partial<T>) => void;
  currentValues: Partial<T>;
  inputProps: InputPropsByType<T>;
}

export interface UseForm<T> {
  initialValues?: T;
  inputs?: InputPropsMapByType<T>;
}

const defaultInputs = { text: [], checkbox: [] };

export const useForm = function<T>({
  initialValues,
  inputs = defaultInputs
}: UseForm<T>): Form<T> {
  const [currentValues, setCurrentValues] = useState<Partial<T>>({});

  const onUpdate = useCallback(
    (newUpdates: Partial<T>) => {
      setCurrentValues({ ...currentValues, ...newUpdates });
    },
    [currentValues, setCurrentValues]
  );

  useEffect(() => {
    if (!!initialValues) {
      setCurrentValues(initialValues);
    }
  }, [initialValues]);

  const { text: textInputs = [], checkbox: checkboxInputs = [] } = inputs;

  let inputProps: InputPropsByType<T> = {
    text: textInputs.reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          type: "text",
          onChange: useCallback(
            ({ target: { value } }) => onUpdate({ [key]: value } as T),
            [onUpdate]
          ),
          value: `${currentValues[key]}`
        }
      }),
      {}
    ),
    checkbox: checkboxInputs.reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          type: "checkbox",
          checked: currentValues[key],
          onChange: useCallback(() => {
            onUpdate(({
              [key]: !currentValues[key]
            } as unknown) as Partial<T>);
          }, [onUpdate])
        }
      }),
      {}
    )
  };

  return {
    onUpdate,
    currentValues,
    inputProps
  };
};

export default useForm;
