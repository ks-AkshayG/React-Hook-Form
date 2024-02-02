import { useState } from "react"
import { useForm } from "react-hook-form";
// import { DevTool } from '@hookform/devtools'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";
import { updateUserData, getSingleUserData } from "../utility/UserDataOperations";
import { UserInputPhoneField, UserInputTypeField, UserSelectionField, UserAddressField, UserConditionalSelectionField } from "../utility/UserFormUtility";
import { States } from '../components/CreateUserForm';

const fields = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  state: "State",
  city: "City",
  address: "Address",
};

type FormValuesType = {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  address?: string
};

const schema = yup.object({
  name: yup.string().required().label(fields.name),
  email: yup
    .string()
    .label(fields.email)
    .email()
    .required(),
  phone: yup
    .string()
    .label(fields.phone)
    .min(10, 'please enter 10-digit valid phone number')
    .max(10, 'please enter 10-digit valid phone number')
    // .phone("IN", "Please enter a valid number")
    .required(),
  state: yup.string().required().label(fields.state),
  city: yup.string().required().label(fields.city),
  address: yup.string()
});

type UpdateRowPropsTypes = {
  id: number
}

const UpdateUserForm = ({id}: UpdateRowPropsTypes) => {
  
  const [status, setStatus] = useState(0);
  const [emailValue, setEmailValue] = useState('');
  const [stateValue, setStateValue] = useState('');

  const fetchDefault = async () => {

    const fetchRow = await getSingleUserData(id)
    
    const data = fetchRow.data
    
    setEmailValue(data.email)
    setStateValue(data.state)
    
    return{
      name: data.name,
      email: data.email,
      phone: data.phone,
      state: data.state,
      city: data.city,
      address: data.address
    }
  }
  
  const form = useForm<FormValuesType>({
    defaultValues: fetchDefault,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  
  const { register, handleSubmit, formState, getValues, setValue } = form;


  const { errors } = formState;

  const handleStateValue = () => {
    setStateValue(getValues('state'))
  }

  const handleReset = () => {
    setStatus(0)
    setStateValue('')
    setValue('state' ,'')
  }
  // console.log(stateValue)

  const onSubmit = (data: FormValuesType) => {

    // console.log(data)

    const updateDataForm = async() => {
      const update = await updateUserData({...data}, id)

      console.log(update.status)
      setStatus(update.status)
    }
    updateDataForm()
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-center font-extrabold my-3 text-[30px]">Update Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <UserInputTypeField
          type="text"
          fieldName={fields.name}
          errorMessage={errors.name?.message}
          register={register('name')}
        />

        <div>
          <UserInputTypeField 
            type="email"
            value={emailValue}
            fieldName={fields.email}
            errorMessage={errors.email?.message}
            register={register('email')}
          />
          <p>{status == 409 && (<>Please enter unique email address</>)}</p>
        </div>

        <UserInputPhoneField 
          type="number"
          fieldName={fields.state}
          register={register('phone')}
          errorMessage={errors.phone?.message}
        />

        <UserSelectionField 
          fieldName={fields.state}
          register={register('state')}
          errorMessage={errors.state?.message}
          onClick={handleStateValue}
          optionArray={States}
        />

        <UserConditionalSelectionField
          fieldName={fields.city}
          register={register('city')}
          errorMessage={errors.city?.message}
          condition1={stateValue}
        />

        <UserAddressField 
          fieldName={fields.address}
          errorMessage={errors.address?.message}
          register={register('address')}
        />

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
        {
          status == 204 && (<div className=" text-[13px] text-green-700">Your data is successfully updated</div>)
        }
      </div>
      {/* <DevTool control={control} /> */}
    </div>
  )
}

export default UpdateUserForm