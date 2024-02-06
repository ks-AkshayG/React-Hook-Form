import { useState } from "react";
import { useForm } from "react-hook-form";
// import { DevTool } from '@hookform/devtools'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";
import { createUserData } from "../utility/UserDataOperations";
import UserTextInputField from "../utility/MantineUserForm/UserTextInputField";
import UserPhoneInput from "../utility/MantineUserForm/UserPhoneInput";
import UserSelectInput from "../utility/MantineUserForm/UserStateInput";
import UserConditionalSelectInput from "../utility/MantineUserForm/UserCityInput";
import UserSubmitForm from "../utility/MantineUserForm/UserSubmitForm";
import UserResetForm from "../utility/MantineUserForm/UserResetForm";

export const States = ["Gujarat", "Maharashtra", "Rajasthan"];
// const GujaratCities = ['Surat', 'Ahmedabad', 'Vadodara']
// const MaharastraCities = ['Pune', 'Mumbai']
// const RajasthanCities = ['Aligadh', 'Raypur']

export const Cities: { [key: string]: { cities: string[] } } = {
  Gujarat: { cities: ["Surat", "Ahmedabad", "Vadodara"] },
  Maharashtra: { cities: ["Pune", "Mumbai"] },
  Rajasthan: { cities: ["Aligadh", "Raypur"] },
};

export type namePropTypes =
  | "name"
  | "email"
  | "phone"
  | "state"
  | "city"
  | "address"
  | "address.line1"
  | "address.line2"
  | "address.postel";

export type UserCreateFormValuesTypes = {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  address: {
    line1?: string;
    line2?: string;
    postel?: string;
  };
};

const fields = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  state: "State",
  city: "City",
  address: "Address",
  line1: "Line1",
  line2: "Line2",
  postel: "Postel",
};

const schema = yup.object({
  name: yup.string().required().label(fields.name),
  email: yup.string().label(fields.email).email().required(),
  phone: yup
    .string()
    .label(fields.phone)
    .min(10, "please enter 10-digit valid phone number")
    .max(10, "please enter 10-digit valid phone number")
    // .phone("IN", "Please enter a valid number")
    .required(),
  state: yup.string().required().label(fields.state),
  city: yup.string().required().label(fields.city),
  address: yup.object({
    line1: yup.string(),
    line2: yup.string(),
    postel: yup.string(),
  }),
});

const defaultFormValues = {
  name: "",
  email: "",
  phone: "",
  state: "",
  city: "",
  address: {
    line1: "",
    line2: "",
    postel: "",
  },
};

const CreateUserForm = () => {
  const [status, setStatus] = useState(0);
  // const [stateValue, setStateValue] = useState("");

  const form = useForm<UserCreateFormValuesTypes>({
    defaultValues: defaultFormValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState, watch, control } = form;

  const { errors } = formState;

  // console.log(watch('phone'))

  // const handleStateValue = (value: string) => {
  //   if(value) {
  //     setStateValue(value);
  //     // console.log(value)
  //   }
  // }
  // console.log(stateValue)

  const handleReset = () => {
    setStatus(0);
    form.reset();
  };

  const onSubmit = (data: UserCreateFormValuesTypes) => {
    const concatAddress = [
      data.address.line1,
      data.address.line2,
      data.address.postel,
    ];
    const address = concatAddress.toString();

    // console.log(name, email, phone, state, city,address)

    const insertDataForm = async () => {
      const insert = await createUserData({ ...data, address });
      // console.log(insert.status)
      setStatus(insert.status);
    };
    insertDataForm();
  };
  // console.log(getValues('state'))

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-center font-extrabold my-3 text-[30px]">Data Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <UserTextInputField
          type="text"
          name="name"
          label={fields.name}
          errorMessage={errors.name?.message}
          control={control}
        />

        <div>
          <UserTextInputField
            type="email"
            name="email"
            label={fields.email}
            errorMessage={errors.email?.message}
            control={control}
          />
          <p>{status == 409 && <>Please enter unique email address</>}</p>
        </div>

        <UserPhoneInput
          name="phone"
          label={fields.phone}
          errorMessage={errors.phone?.message}
          control={control}
        />

        <UserSelectInput
          name="state"
          label={fields.state}
          errorMessage={errors.state?.message}
          control={control}
          // onClick={(value) => handleStateValue(value)}
          data={States}
        />

        <UserConditionalSelectInput
          name="city"
          label="City"
          errorMessage={errors.city?.message}
          condition={watch("state")}
          control={control}
        />

        <div>
          <p>{fields.address}:</p>
          <UserTextInputField
            type="text"
            name="address.line1"
            label="Line1"
            control={control}
          />
          <UserTextInputField
            type="text"
            name="address.line2"
            label="Line2"
            control={control}
          />
          <UserTextInputField
            type="number"
            name="address.postel"
            label="Postel"
            control={control}
          />
        </div>

        <div className="w-full flex flex-row justify-center my-3">
          <UserSubmitForm />
          <UserResetForm onClick={handleReset} />
        </div>
      </form>
      <div>
        {status == 201 && (
          <div className=" text-[13px] text-green-700">
            Your data is successfully submited
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUserForm;
