import { ControlledInput } from "../../types";

interface InputProps {
  onChange: React.ChangeEventHandler<HTMLElement>;
  value: string;
}

export interface Form<T> {
  onUpdate: (updates: Partial<T>) => void;
  currentValues: Partial<T>;
  generateControlledInputProps: <FIELD_TYPE>(
    s: keyof T
  ) => ControlledInput<FIELD_TYPE>;
  generateTextInput: (s: keyof T) => InputProps;
  generateCheckboxInput: (
    s: keyof T
  ) => {
    onChange: React.ChangeEventHandler<HTMLElement>;
    checked: any;
  };
}
