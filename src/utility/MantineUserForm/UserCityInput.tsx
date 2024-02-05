import { Select } from "@mantine/core";
import { Cities } from "../../components/CreateUserForm";
import { useController, Control } from "react-hook-form";
import { namePropTypes } from "../../components/CreateUserForm"

type UserConditionalSelectInputPropTypes = {
  label: string;
  name: namePropTypes
  errorMessage?: string;
  control: Control<any>
  condition: string;
};

const UserConditionalSelectInput = ({
  label,
  name,
  errorMessage,
  control,
  condition,
}: UserConditionalSelectInputPropTypes) => {

  const { field } = useController({ name, control})

  let data: string[] | undefined = [];
  
  if (condition) {
    data = Cities[condition].cities;
  }
  // console.log(data)

  // console.log(field.onChange)

  return (
    <div className="w-full flex flex-row">
      <Select
        value={field.value}
        id={label}
        className="w-full"
        label={label}
        error={errorMessage}
        data={data}
        name={field.name}
        ref={field.ref}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
    </div>
  );
};

export default UserConditionalSelectInput;
