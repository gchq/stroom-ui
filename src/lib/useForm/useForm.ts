import { useCallback, useEffect, useState } from "react";
import { ControlledInput } from "src/types";
import { Form } from "./types";

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
  const [value, setCurrentValues] = useState<Partial<T>>(initialValues || {});

  // Memo-ized function to combine updates with existing state
  const onUpdate = useCallback(
    (newUpdates: Partial<T>) => {
      setCurrentValues({ ...value, ...newUpdates });
    },
    [value, setCurrentValues],
  );

  // Set the current values to the initial values, whenever those change
  useEffect(() => {
    if (!!initialValues) {
      setCurrentValues(initialValues);
    }
  }, [initialValues, setCurrentValues]);

  // Call out to the validation function when the values change
  useEffect(() => {
    if (!!onValidate) {
      onValidate(value);
    }
  }, [value, onValidate]);

  const useTextInput = (s: keyof T) => ({
    type: "text",
    onChange: useCallback(
      ({ target: { value } }) => onUpdate({ [s]: value } as T),
      [onUpdate],
    ),
    value: `${value[s]}`,
  });

  const useCheckboxInput = (s: keyof T) => ({
    type: "checkbox",
    checked: value[s],
    onChange: useCallback(() => {
      onUpdate(({
        [s]: !value[s],
      } as unknown) as Partial<T>);
    }, [value[s], onUpdate]),
  });

  const useControlledInputProps = <FIELD_TYPE>(
    s: keyof T,
  ): ControlledInput<FIELD_TYPE> => ({
    value: (value[s] as unknown) as FIELD_TYPE,
    onChange: useCallback(v => onUpdate(({ [s]: v } as unknown) as T), [
      onUpdate,
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
