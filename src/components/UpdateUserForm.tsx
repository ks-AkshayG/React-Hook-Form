import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import * as yup from "yup";

import "yup-phone-lite";

import { Cities, States } from "../components/CreateUserForm";
import Supabase from "../config/Supabase";
import MantineButton from "../components/MantineFormInputes/MantineButton";
import MantinePhoneInput from "../components/MantineFormInputes/MantinePhoneInput";
import MantineSelectInput from "../components/MantineFormInputes/MantineSelectInput";
import MantineTextInputField from "../components/MantineFormInputes/MantineTextInputField";
import MantineTextareaInput from "../components/MantineFormInputes/MantineTextareaInput";

import { IUser } from "@/types/user";
import { useUpdateUserData } from "@/utility/SupabaseOperations";

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
    .required(),
  state: yup.string().required().label(fields.state),
  city: yup.string().required().label(fields.city),
  address: yup.string(),
});

type UpdateRowPropsTypes = {
  id: number;
};

const UpdateUserForm = ({ id }: UpdateRowPropsTypes) => {
  const [cityData, setCityData] = useState([""]);
  const [cityMatching, setCityMatching] = useState(true);


  const { refetch } = useQuery(
    ["get-user-data", id],
    async () => {
      const response = await Supabase.from("dataform")
        .select()
        .eq("id", id)
        .single();

      return response.data as IUser;
    },
    {
      keepPreviousData: true,
      enabled: false,
    }
  );

  const refreshUserData = async () => {
    const res = await refetch();
    return res.data as IUser;
  };

  const form = useForm<UserUpdateFormValuesTypes>({
    defaultValues: refreshUserData,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState, control, watch, getValues } = form;

  const { errors } = formState;

  useEffect(() => {
    if (watch("state")) {
      setCityData(Cities[watch("state")].cities); //
    }
  }, [watch("state")]);

  const handleReset = () => {
    form.reset();
  };

  const { mutate: updateUser, data: updatedUserData } = useUpdateUserData();

  const onSubmit = (data: UserUpdateFormValuesTypes) => {

    Cities[getValues("state")].cities.includes(getValues("city"))
      ? (updateUser({ ...data, id }), setCityMatching(true))
      : setCityMatching(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-center font-extrabold my-3 text-[30px]">
        Update Form
      </h2>

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
            disable={true}
          />
          <p className=" text-[13px] text-red-700">
            {updatedUserData?.status == 409 && (
              <>Please enter unique email address</>
            )}
          </p>
        </div>

        <MantinePhoneInput
          name="phone"
          label={fields.phone}
          control={control}
          errorMessage={errors.phone?.message}
        />

        <MantineSelectInput
          name="state"
          label={fields.state}
          control={control}
          errorMessage={errors.state?.message}
          data={States}
        />

        <MantineSelectInput
          name="city"
          label={fields.city}
          control={control}
          errorMessage={errors.city?.message}
          data={cityData}
        />
        <p className=" text-[13px] text-red-700">
          {cityMatching === false && <>City is not matched with State</>}
        </p>

        <MantineTextareaInput
          name="address"
          label={fields.address}
          errorMessage={errors.address?.message}
          control={control}
        />

        <div className="w-full flex flex-row justify-center my-3">
          <MantineButton type="submit" />
          <MantineButton type="reset" onClick={handleReset} />
        </div>
      </form>
      <div>
        {updatedUserData?.status == 204 && (
          <div className=" text-[13px] text-green-700">
            Your data is successfully updated
          </div>
        )}
      </div>
      {/* <DevTool control={control} /> */}
    </div>
  );
  // }
};

export default UpdateUserForm;
