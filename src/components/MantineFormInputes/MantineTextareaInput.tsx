import { Textarea } from "@mantine/core";
import { useController, Control } from "react-hook-form";
import { namePropTypes } from "../../components/CreateUserForm"

type props = {
    label: string;
    name: namePropTypes
    errorMessage?: string;
    control: Control<any>
};

const UserTextareaInput = ({label, name, errorMessage,control}: props) => {

    const { field } = useController({ name, control})

  return (
    <div>
        <Textarea 
            defaultValue={field.value}
            name={field.name}
            ref={field.ref}
            onChange={field.onChange}
            onBlur={field.onBlur}
            label={label}
            error={errorMessage}
        />
    </div>
  )
}

export default UserTextareaInput