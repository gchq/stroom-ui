import { useCallback, useEffect, useState } from "react";
import { ControlledInput } from "../../types";

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
  generateControlledInputProps: <FIELD_TYPE>(
    s: keyof T
  ) => ControlledInput<FIELD_TYPE>;
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
  onValidate?: (updates: Partial<T>) => void;
}

const defaultInputs = { text: [], checkbox: [] };
const defaultOnValidate = () => {};

export const useForm = function<T>({
  initialValues,
  inputs = defaultInputs,
  onValidate = defaultOnValidate
}: UseForm<T>): Form<T> {
  const [currentValues, setCurrentValues] = useState<Partial<T>>(
    initialValues || {}
  );

  // Memo-ized function to combine updates with existing state
  const onUpdate = useCallback(
    (newUpdates: Partial<T>) => {
      setCurrentValues({ ...currentValues, ...newUpdates });
    },
    [currentValues, setCurrentValues]
  );

  // Set the current values to the initial values, whenever those change
  useEffect(() => {
    if (!!initialValues) {
      setCurrentValues(initialValues);
    }
  }, [initialValues]);

  // Call out to the validation function when the values change
  useEffect(() => {
    onValidate(currentValues);
  }, [currentValues]);

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

  const generateControlledInputProps = <FIELD_TYPE>(
    s: keyof T
  ): ControlledInput<FIELD_TYPE> => ({
    value: (currentValues[s] as unknown) as FIELD_TYPE,
    onChange: useCallback(v => onUpdate({ [s]: v } as T), [onUpdate])
  });

  return {
    onUpdate,
    currentValues,
    inputProps,
    generateControlledInputProps
  };
};

export default useForm;
