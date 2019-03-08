import { useCallback, useEffect, useState } from "react";
import { ControlledInput } from "../../types";
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

const defaultOnValidate = () => {};

export const useForm = function<T>({
  initialValues,
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

  const generateTextInput = (s: keyof T) => ({
    type: "text",
    onChange: useCallback(
      ({ target: { value } }) => onUpdate({ [s]: value } as T),
      [onUpdate]
    ),
    value: `${currentValues[s]}`
  });

  const generateCheckboxInput = (s: keyof T) => ({
    type: "checkbox",
    checked: currentValues[s],
    onChange: useCallback(() => {
      onUpdate(({
        [s]: !currentValues[s]
      } as unknown) as Partial<T>);
    }, [currentValues[s], onUpdate])
  });

  const generateControlledInputProps = <FIELD_TYPE>(
    s: keyof T
  ): ControlledInput<FIELD_TYPE> => ({
    value: (currentValues[s] as unknown) as FIELD_TYPE,
    onChange: useCallback(v => onUpdate({ [s]: v } as T), [onUpdate])
  });

  return {
    onUpdate,
    currentValues,
    generateTextInput,
    generateCheckboxInput,
    generateControlledInputProps
  };
};

export default useForm;
