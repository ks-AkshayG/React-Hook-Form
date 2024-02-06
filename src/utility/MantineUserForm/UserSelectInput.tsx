import { Select } from "@mantine/core";
import { useController, Control } from "react-hook-form";
import { namePropTypes } from "../../components/CreateUserForm"

type UserSelectInputPropTypes = {
  label: string;
  name: namePropTypes
  errorMessage?: string;
  data: string[];
  control: Control<any>;
};

const UserSelectInput = ({
  label,
  errorMessage,
  name,
  data,
  control,
}: UserSelectInputPropTypes) => {

  const {field} = useController({ name, control})

  // console.log(field.value)

  return (
    <div className="w-full flex flex-row">
      <Select
        value={field.value}
        className="w-full"
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        name={field.name}
        label={label}
        error={errorMessage}
        data={data}
        allowDeselect={false}
      />
    </div>
  );
};

export default UserSelectInput;
