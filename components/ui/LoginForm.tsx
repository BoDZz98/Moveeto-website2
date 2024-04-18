import React, { useState } from "react";
import InputField from "./Input";
import siginup from "@/pages/signup";

type LoginFormProps = {
  signingUp?: boolean;
  submitHandler: (email: string, pass: string, userName: string) => void;
};
const LoginForm = ({ signingUp, submitHandler }: LoginFormProps) => {
  const [inputs, setInputs] = useState({
    username: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
  });
  function changeInputHandler(identifier: string, enteredValue: string) {
    setInputs((prevState) => {
      return {
        ...prevState,
        [identifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  //----------------------------------------------------------------------
  function onSubmitForm(e: any) {
    e.preventDefault();
    const emailIsValid =
      inputs.email.value.length !== 0 && inputs.email.value.includes("@");
    const usernameIsValid = inputs.username.value.length > 4;
    const passwordIsValid = inputs.password.value.length > 4;
    if (
      (emailIsValid && passwordIsValid) ||
      (signingUp && usernameIsValid && emailIsValid && passwordIsValid)
    ) {
      // If all is good
      submitHandler(
        inputs.email.value,
        inputs.password.value,
        inputs.username && inputs.username.value
      );
    } else {
      // If sth wrong with the inputs field
      setInputs((prev) => {
        return {
          username: {
            value: prev.username.value,
            isValid: usernameIsValid,
          },
          email: {
            value: prev.email.value,
            isValid: emailIsValid,
          },
          password: {
            value: prev.password.value,
            isValid: passwordIsValid,
          },
        };
      });
    }
  }
  return (
    <form onSubmit={onSubmitForm} className=" flex flex-col w-1/2 gap-y-6">
      <InputField
        label="Email"
        type="text"
        value={inputs.email.value}
        hasError={!inputs.email.isValid}
        setValue={(value: string) => changeInputHandler("email", value)}
      />
      {signingUp && (
        <InputField
          label="Username"
          type="text"
          value={inputs.username.value}
          hasError={!inputs.username.isValid}
          setValue={(value: string) => changeInputHandler("username", value)}
        />
      )}
      <InputField
        label="Password"
        type="password"
        value={inputs.password.value}
        hasError={!inputs.password.isValid}
        setValue={(value: string) => changeInputHandler("password", value)}
      />
      <button
        className="bg-white rounded-lg p-4 text-black text-xl font-bold hover:bg-gray-400"
        type="submit"
      >
        {signingUp ? "Sign up" : "Log in"}
      </button>
    </form>
  );
};

export default LoginForm;
