import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { EmployeeRegisterFormFields } from "../../pages/employee-register";
import { EmployerRegisterFormFields } from "../../pages/employer-register";

interface PasswordFieldProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  name: string;
  placeholder: string;
  showDesc?: boolean;
}

const PasswordField = ({
  register,
  watch,
  name,
  placeholder,
  showDesc = true,
}: PasswordFieldProps) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="w-full">
      <div className="w-full relative">
        <input
          type={showPass ? "text" : "password"}
          className={`bg-white px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
          placeholder={placeholder}
          {...register(name === "password" ? "password" : "cnfPassword", {
            required: {
              value: true,
              message:
                name === "password"
                  ? "password is required!"
                  : "confirm password is required!",
            },
            pattern:
              name === "password"
                ? {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d.@$!%*#?&]{8,}$/,
                    message: "enter valid password!",
                  }
                : undefined,
            validate:
              name === "password"
                ? undefined
                : (val: string) => {
                    if (watch("password") !== val) {
                      return "both passwords do no match!";
                    }
                  },
          })}
          autoComplete="off"
        />
        <FontAwesomeIcon
          icon={showPass ? faEyeSlash : faEye}
          className="text-gray-500 right-2 absolute cursor-pointer"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
          size={"xs"}
          onClick={() => {
            setShowPass((prev) => !prev);
          }}
        />
      </div>
      {name === "password" && showDesc && (
        <p className="text-xs text-white px-1 font-light py-1">
          {
            "Password should be 8-12 characters long with atleast one uppercase letter, containing a number (0-9) and a special character (@,#,%,$...)"
          }
        </p>
      )}
    </div>
  );
};

export default PasswordField;
