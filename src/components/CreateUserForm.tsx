import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";
import MantineTextInputField from "../components/MantineFormInputes/MantineTextInputField";
import MantinePhoneInput from "../components/MantineFormInputes/MantinePhoneInput";
import MantineSelectInput from "../components/MantineFormInputes/MantineSelectInput";
import MantineButton from "../components/MantineFormInputes/MantineButton";
import useCreateUserData from "../utility/SupabaseOperations/useCreateUserData";

export const States = ["Gujarat", "Maharashtra", "Rajasthan"];

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

  const [cityData, setCityData] = useState(['']);

  const form = useForm<UserCreateFormValuesTypes>({
    defaultValues: defaultFormValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState, watch, control } = form;

  const { errors } = formState;

  useEffect(() => {

    if (watch('state')) {
      setCityData(Cities[watch('state')].cities)
    }

  }, [watch('state')])

  const handleReset = () => {
    form.reset();
  };

  const { mutate: createUser, data: createdUserData } = useCreateUserData()

  const onSubmit = (data: UserCreateFormValuesTypes) => {
    const concatAddress = [
      data.address.line1,
      data.address.line2,
      data.address.postel,
    ];
    const address = concatAddress.toString();

    createUser({...data, address})
  };
  // console.log(getValues('state'))

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-center font-extrabold my-3 text-[30px]">Data Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <MantineTextInputField
          type="text"
          name="name"
          label={fields.name}
          errorMessage={errors.name?.message}
          control={control}
        />

        <div>
          <MantineTextInputField
            type="email"
            name="email"
            label={fields.email}
            errorMessage={errors.email?.message}
            control={control}
          />
          <span>
            {createdUserData?.status == 409 &&
             <p className=" text-[13px] text-red-700">Please enter unique email address</p>}
          </span>
        </div>

        <MantinePhoneInput
          name="phone"
          label={fields.phone}
          errorMessage={errors.phone?.message}
          control={control}
        />

        <MantineSelectInput
          name="state"
          label={fields.state}
          errorMessage={errors.state?.message}
          control={control}
          data={States}
        />

        <MantineSelectInput
          name="city"
          label={fields.city}
          errorMessage={errors.city?.message}
          control={control}
          data={cityData}
        />

        <div>
          <p>{fields.address}:</p>
          <MantineTextInputField
            type="text"
            name="address.line1"
            label={fields.line1}
            control={control}
          />
          <MantineTextInputField
            type="text"
            name="address.line2"
            label={fields.line2}
            control={control}
          />
          <MantineTextInputField
            type="number"
            name="address.postel"
            label={fields.postel}
            control={control}
          />
        </div>

        <div className="w-full flex flex-row justify-center my-3">
          <MantineButton type="submit" />
          <MantineButton type="reset" onClick={handleReset} />
        </div>
      </form>
      <div>
        {createdUserData?.status == 201 && (
          <div className=" text-[13px] text-green-700">
            Your data is successfully submited
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUserForm;
