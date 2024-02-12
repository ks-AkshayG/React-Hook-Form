import { Select, InputWrapper, Input } from "@mantine/core";
import { useController, Control } from "react-hook-form";
import { namePropTypes } from "../../components/CreateUserForm"

type UserPhoneInputPropTypes = {
  label: string;
  name: namePropTypes
  errorMessage?: string;
  control: Control<any>
}

const UserPhoneInput = ({
  label,
  name,
  errorMessage,
  control,
}: UserPhoneInputPropTypes) => {

  const {field} = useController({ name, control})

  // console.log(field.value)

  return (
    <div className="w-full flex flex-row">
      <Select
        defaultValue={"+91"}
        className="w-[30%]"
        label="Country Code"
        data={["+91"]}
      />
      <InputWrapper label={label} error={errorMessage} className="w-full">
        <Input
          defaultValue={field.value}
          type='number'
          id={label}
          name={field.name}
          ref={field.ref}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      </InputWrapper>
    </div>
  );
};

export default UserPhoneInput