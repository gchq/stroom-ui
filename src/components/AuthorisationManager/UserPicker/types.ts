import { IsGroup } from "src/api/userGroups";

export interface BaseProps {
  isGroup: IsGroup;
  // If we are picking a group to add to an existing list...we should
  // not present those existing items as options
  valuesToFilterOut?: Array<string>;
}

export interface Props extends BaseProps {
  value?: string;
  onChange: (v: string) => any;
}

export interface UseProps {
  pickerProps: Props;
  reset: () => void;
}
