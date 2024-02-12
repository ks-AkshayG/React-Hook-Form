import { Input, InputWrapper } from "@mantine/core";
import { useController, Control } from "react-hook-form";
import { namePropTypes } from "../../components/CreateUserForm";

// ----------------------------------------------------------------------

type Props = {
  type: string
  label: string;
  errorMessage?: string;
  name: namePropTypes;
  control: Control<any>;
  disable?: boolean
};

const UserInputField = ({ type, label, errorMessage, control, name, disable }: Props) => {

  const { field } = useController({ name, control });

  return (
    <InputWrapper label={label} error={errorMessage}>
      <Input
        defaultValue={field.value}
        type={type}
        id={label}
        name={field.name}
        ref={field.ref}
        onChange={field.onChange}
        onBlur={field.onBlur}
        disabled={disable}
      />
    </InputWrapper>
  );
};

export default UserInputField;
