import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { DevTool } from '@hookform/devtools'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";
import {
  updateUserData,
  getSingleUserData,
} from "../utility/UserDataOperations";
import { States } from "../components/CreateUserForm";
import UserTextInputField from "../utility/MantineUserForm/UserTextInputField";
import UserPhoneInput from "../utility/MantineUserForm/UserPhoneInput";
import UserSelectInput from "../utility/MantineUserForm/UserSelectInput";
import UserTextareaInput from "../utility/MantineUserForm/UserTextareaInput";
import Button from "../utility/MantineUserForm/Button";
import { Cities } from "../components/CreateUserForm";

const fields = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  state: "State",
  city: "City",
  address: "Address",
};

export type UserUpdateFormValuesTypes = {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  address?: string;
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
  address: yup.string(),
});

type UpdateRowPropsTypes = {
  id: number;
};

const UpdateUserForm = ({ id }: UpdateRowPropsTypes) => {
  const [cityData, setCityData] = useState(['']);
  const [status, setStatus] = useState(0);
  const [emailValue, setEmailValue] = useState("");
  const [cityMatching, setCityMatching] = useState(true);

  const fetchDefault = async () => {
    const fetchRow = await getSingleUserData(id);

    const data = fetchRow.data;

    // console.log(fetchRow.data)

    setEmailValue(data.email);

    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      state: data.state,
      city: data.city,
      address: data.address,
    };
  };

  const form = useForm<UserUpdateFormValuesTypes>({
    defaultValues: fetchDefault,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState, control, watch, getValues } = form;

  const { errors } = formState;

  useEffect(() => {

    if (watch('state')) {
      setCityData(Cities[watch('state')].cities)
    }

  }, [watch('state')])

  const handleReset = () => {
    setStatus(0);
    form.reset();
  };
  // console.log(stateValue)

  const onSubmit = (data: UserUpdateFormValuesTypes) => {
    // console.log(data)

    const updateDataForm = async () => {
      const update = await updateUserData({ ...data }, id);

      // console.log(update.status);
      setStatus(update.status);
    };

    Cities[getValues("state")].cities.includes(getValues("city")) ? (updateDataForm(), setCityMatching(true)) : setCityMatching(false)

  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-center font-extrabold my-3 text-[30px]">
        Update Form
      </h2>

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
            value={emailValue}
            label={fields.email}
            errorMessage={errors.email?.message}
            control={control}
          />
          <p className=" text-[13px] text-red-700">
            {status == 409 && <>Please enter unique email address</>}
          </p>
        </div>

        <UserPhoneInput
          name="phone"
          label={fields.phone}
          control={control}
          errorMessage={errors.phone?.message}
        />

        <UserSelectInput
          name="state"
          label={fields.state}
          control={control}
          errorMessage={errors.state?.message}
          data={States}
        />
        
        <UserSelectInput
          name="city"
          label={fields.city}
          control={control}
          errorMessage={errors.city?.message}
          data={cityData}
        />
        <p className=" text-[13px] text-red-700">
          {cityMatching === false && <>City is not matched with State</>}
        </p>

        <UserTextareaInput
          name="address"
          label={fields.address}
          errorMessage={errors.address?.message}
          control={control}
        />

        <div className="w-full flex flex-row justify-center my-3">
          <Button type="submit" />
          <Button type="reset" onClick={handleReset} />
        </div>
      </form>
      <div>
        {status == 204 && (
          <div className=" text-[13px] text-green-700">
            Your data is successfully updated
          </div>
        )}
      </div>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default UpdateUserForm;
