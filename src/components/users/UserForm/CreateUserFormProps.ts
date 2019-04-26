import { User } from "../types";
import UserFormData from "./UserFormData";

interface CreateUserFormProps {
  onSubmit: (user: User) => void;
  onBack: () => void;
  onCancel: () => void;
  onValidate: (values: UserFormData) => Promise<void>;
}

export default CreateUserFormProps;
