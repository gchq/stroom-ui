import * as React from "react";
import { useAllAppPermissions } from "src/api/appPermission";
import CheckboxSeries from "../../../components/CheckboxSeries";

interface Props {
  value: Array<string>;
  addPermission: (permissionName: string) => void;
  removePermission: (permissionName: string) => void;
}

export const AppPermissionPicker = ({
  value,
  addPermission,
  removePermission
}: Props) => {
  const allAppPermissions = useAllAppPermissions();

  return (
    <CheckboxSeries
      allValues={allAppPermissions}
      includedValues={value}
      addValue={addPermission}
      removeValue={removePermission}
    />
  );
};

export default AppPermissionPicker;
