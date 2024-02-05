import { Cities } from "../components/CreateUserForm";

type UserInputTypePropTypes = {
  type: string;
  fieldName: string;
  errorMessage?: string;
  register: object;
  value?: string;
};

export const UserInputTypeField = ({
  type,
  fieldName,
  errorMessage,
  register,
  value,
}: UserInputTypePropTypes) => {
  return (
    <div className="w-full my-2">
      <label htmlFor={fieldName} className=" block">
        {fieldName}:
      </label>
      <input
        type={type}
        value={value}
        id={fieldName}
        {...register}
        className=" border border-gray-300 hover:border-gray-600 rounded-lg px-2"
      />
      <p className=" text-[13px] text-red-700">{errorMessage}</p>
    </div>
  );
};

type UserInputPhoneFieldPropTypes = {
  type: string;
  fieldName: string;
  errorMessage?: string;
  register: object;
};

export const UserInputPhoneField = ({
  type,
  fieldName,
  errorMessage,
  register,
}: UserInputPhoneFieldPropTypes) => {
  return (
    <div className="w-full my-2">
      <label htmlFor="phone" className="block">
        {fieldName}:
      </label>
      <select id="country" className=" mr-2">
        <option value="India">+91 &#x1F1EE;&#x1F1F3; </option>
      </select>
      <input
        type={type}
        id={fieldName}
        className=" border border-gray-300 hover:border-gray-600 rounded-lg px-2"
        {...register}
      />
      <p className=" text-[13px] text-red-700">{errorMessage}</p>
    </div>
  );
};

type UserSelectionPropTypes = {
  fieldName: string;
  register: object;
  errorMessage?: string;
  onClick?: () => void;
  optionArray: string[];
};

export const UserSelectionField = ({
  fieldName,
  register,
  errorMessage,
  onClick,
  optionArray,
}: UserSelectionPropTypes) => {
  return (
    <div className="w-full my-2">
      <label htmlFor="state" className="block">
        {fieldName}:
      </label>
      <select id="state" {...register} onClick={onClick}>
        <option value="">Select</option>
        {optionArray.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
      <p className=" text-[13px] text-red-700">{errorMessage}</p>
    </div>
  );
};

type UserConditionalSelectionFieldTypes = {
  fieldName: string;
  register: {};
  errorMessage?: string;
  condition1: string;
};

export const UserConditionalSelectionField = ({
  fieldName,
  register,
  errorMessage,
  condition1,
}: UserConditionalSelectionFieldTypes) => {
  return (
    <div className="w-full my-2">
      <label htmlFor="city" className="block">
        {fieldName}:
      </label>
      <select id="city" {...register}>
        {condition1 == "" && <option value="">Select</option>}
        {condition1 !== "" &&
          Cities[condition1].cities.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
      </select>
      <p className=" text-[13px] text-red-700">{errorMessage}</p>
    </div>
  );
};

type UserAddressFieldTypes = {
  fieldName: string;
  errorMessage?: string;
  register: {};
};

export const UserAddressField = ({
  fieldName,
  errorMessage,
  register,
}: UserAddressFieldTypes) => {
  return (
    <div className="w-full my-2">
      <label htmlFor={fieldName} className=" block">
        {fieldName}:
      </label>
      <textarea
        id={fieldName}
        className=" border border-gray-300 hover:border-gray-600 rounded-lg px-2 resize-none"
        {...register}
      ></textarea>
      <p className=" text-[13px] text-red-700">{errorMessage}</p>
    </div>
  );
};
