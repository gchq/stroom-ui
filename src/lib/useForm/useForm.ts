import * as React from "react";
import { Form, ControlledInput } from "./types";

/**
 * The form can be given lists of field names for text and checkbox based HTML input elements.
 * It will then generate onChange/value pairs for those fields which can be destructed from
 * the response to useForm.
 */
interface UseForm<T> {
  initialValues?: T;
  onValidate?: (updates: Partial<T>) => void;
}

export const useForm = function<T>({
  initialValues,
  onValidate,
}: UseForm<T>): Form<T> {
  const [value, setCurrentValues] = React.useState<Partial<T>>(
    initialValues || {},
  );

  // Memo-ized function to combine updates with existing state
  const onUpdate = React.useCallback(
    (newUpdates: Partial<T>) => {
      setCurrentValues({ ...value, ...newUpdates });
    },
    [value, setCurrentValues],
  );

  // Set the current values to the initial values, whenever those change
  React.useEffect(() => {
    if (!!initialValues) {
      setCurrentValues(initialValues);
    }
  }, [initialValues, setCurrentValues]);

  // Call out to the validation function when the values change
  React.useEffect(() => {
    if (!!onValidate) {
      onValidate(value);
    }
  }, [value, onValidate]);

  const useTextInput = (s: keyof T) => ({
    type: "text",
    onChange: React.useCallback(
      ({ target: { value } }) => onUpdate({ [s]: value } as T),
      [s],
    ),
    value: `${value[s]}`,
  });

  const useCheckboxInput = (s: keyof T) => ({
    type: "checkbox",
    checked: value[s],
    onChange: React.useCallback(() => {
      onUpdate(({
        [s]: !value[s],
      } as unknown) as Partial<T>);
    }, [s]),
  });

  const useControlledInputProps = <FIELD_TYPE>(
    s: keyof T,
  ): ControlledInput<FIELD_TYPE> => ({
    value: (value[s] as unknown) as FIELD_TYPE,
    onChange: React.useCallback(v => onUpdate(({ [s]: v } as unknown) as T), [
      s,
    ]),
  });

  return {
    onUpdate,
    value,
    useTextInput,
    useCheckboxInput,
    useControlledInputProps,
  };
};

export default useForm;
