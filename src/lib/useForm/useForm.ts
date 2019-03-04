import { useCallback, useEffect, useState } from "react";

interface InputProps {
  onChange: React.ChangeEventHandler<HTMLElement>;
  value: string;
}
type InputPropsMapByName<T> = { [s in keyof T]?: InputProps };
type InputPropsByNameByType<T> = {
  text: InputPropsMapByName<T>;
  checkbox: InputPropsMapByName<T>;
};

type InputNameListsByType<T> = {
  text?: Array<keyof T>;
  checkbox?: Array<keyof T>;
};

export interface Form<T> {
  onUpdate: (updates: Partial<T>) => void;
  currentValues: Partial<T>;
  inputProps: InputPropsByNameByType<T>;
}

/**
 * The form can be given lists of field names for text and checkbox based HTML input elements.
 * It will then generate onChange/value pairs for those fields which can be destructed from
 * the response to useForm.
 */
export interface UseForm<T> {
  initialValues?: T;
  inputs?: InputNameListsByType<T>;
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

  let inputProps: InputPropsByNameByType<T> = {
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
