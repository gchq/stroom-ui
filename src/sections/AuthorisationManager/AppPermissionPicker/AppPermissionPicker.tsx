import * as React from "react";
import { useAllAppPermissions } from "../../../api/appPermission";

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
    <div>
      {allAppPermissions
        .map(permission => ({
          permission,
          isSelected: value.includes(permission)
        }))
        .map(({ permission, isSelected }) => (
          <div key={permission}>
            <label>{permission}</label>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => {
                if (isSelected) {
                  removePermission(permission);
                } else {
                  addPermission(permission);
                }
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default AppPermissionPicker;
