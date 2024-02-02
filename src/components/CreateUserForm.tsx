import { useState } from "react";
import { useForm } from "react-hook-form";
// import { DevTool } from '@hookform/devtools'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";
import { createUserData } from "../utility/UserDataOperations";
import {
  UserInputTypeField,
  UserInputPhoneField,
  UserSelectionField,
  UserConditionalSelectionField,
} from "../utility/UserFormUtility";

export const States = ["Gujarat", "Maharashtra", "Rajasthan"];
// const GujaratCities = ['Surat', 'Ahmedabad', 'Vadodara']
// const MaharastraCities = ['Pune', 'Mumbai']
// const RajasthanCities = ['Aligadh', 'Raypur']

export const Cities: { [key: string]: { cities: string[] } } = {
  "Gujarat": { cities: ["Surat", "Ahmedabad", "Vadodara"] },
  "Maharashtra": { cities: ["Pune", "Mumbai"] },
  "Rajasthan": { cities: ["Aligadh", "Raypur"] },
};

type formValues = {
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
  const [stateValue, setStateValue] = useState("");

  const form = useForm({
    defaultValues: defaultFormValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, getValues } = form;

  const { errors } = formState;

  const handleStateValue = () => setStateValue(getValues("state"));

  const handleReset = () => setStatus(0);

  const onSubmit = (data: formValues) => {
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

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-center font-extrabold my-3 text-[30px]">Data Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <UserInputTypeField
          type="text"
          fieldName="Name"
          errorMessage={errors.name?.message}
          register={register("name")}
        />

        <div>
          <UserInputTypeField
            type="email"
            fieldName="Email"
            errorMessage={errors.email?.message}
            register={register("email")}
          />
          <p>{status == 409 && <>Please enter unique email address</>}</p>
        </div>

        <UserInputPhoneField
          type="number"
          fieldName="Phone"
          errorMessage={errors.phone?.message}
          register={register("phone")}
        />

        <UserSelectionField
          fieldName="State"
          errorMessage={errors.state?.message}
          register={register("state")}
          onClick={handleStateValue}
          optionArray={States}
        />

        <UserConditionalSelectionField
          fieldName="City"
          register={register("city")}
          errorMessage={errors.city?.message}
          condition1={stateValue}
        />

        <div>
          <p>{fields.address}:</p>
          <UserInputTypeField
            type="text"
            fieldName="Line1"
            register={register("address.line1")}
          />
          <UserInputTypeField
            type="text"
            fieldName="Line2"
            register={register("address.line2")}
          />
          <UserInputTypeField
            type="text"
            fieldName="Postel"
            register={register("address.postel")}
          />
        </div>

        <div className="w-full text-center my-3">
          <input
            type="submit"
            className=" mx-3 border border-black hover:border-green-700 hover:bg-green-700 hover:text-white px-2 rounded-md"
            value="Submit"
          />
          <input
            type="reset"
            className=" mx-3 border border-black hover:border-red-700 hover:bg-red-700 hover:text-white px-2 rounded-md"
            onClick={handleReset}
            value="Reset"
          />
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
