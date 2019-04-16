import { User } from "..";
import UserFormData from "./UserFormData";

export default interface CreateUserFormProps {
  onSubmit: (user: User) => void;
  onBack: () => void;
  onCancel: () => void;
  onValidate: (values: UserFormData) => Promise<void>;
};
