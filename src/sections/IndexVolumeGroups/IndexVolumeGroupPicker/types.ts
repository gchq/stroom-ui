export interface PickerBaseProps {
  valuesToFilterOut?: Array<string>;
}

export interface PickerProps extends PickerBaseProps {
  value?: string;
  onChange: (v: string) => any;
}

export interface UsePickerProps extends PickerProps {
  reset: () => void;
}
