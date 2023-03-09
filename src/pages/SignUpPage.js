import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import IconEyeCloss from "../components/icons/IconEyeCloss";
import IconEyseOpen from "../components/icons/IconEyseOpen";
import Input from "../components/input/Input";
import Lable from "../components/lable/Lable";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import Logo from "./Logo";
const SignUpPage = () => {
  const schema = yup
    .object()
    .shape({
      fullName: yup.string().required("please full name is not empty !"),
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(8, "your password must be at least 8 charaters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
          message:
            "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number: ",
        })
        .required("please enter your password "),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: "",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const handleSignUp = async (values) => {
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullName,
    });
    const colRel = collection(db, "users");
    addDoc(colRel, {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    });
    toast.success("Register successfully!!!");
    navigate("/");
  };
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <div className="mx-auto w-full max-w-[1024px] mt-14">
      <Logo></Logo>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex flex-col max-w-[800px] mx-auto"
        autoComplete="off"
      >
        <div>
          <Lable htmlFor="fullName">Full name</Lable>
          <Input
            type="text"
            placeholder="enter your Name "
            name="fullName"
            control={control}
          ></Input>
          {errors.fullName && (
            <p className="mt-2 text-red-600 text-sm">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div className="mt-8">
          <Lable htmlFor="email">Email adress</Lable>
          <Input
            type="email"
            placeholder="enter your email address "
            name="email"
            control={control}
          ></Input>
          {errors.email && (
            <p className="mt-2 text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-8">
          <Lable htmlFor="password">PassWord</Lable>
          <div className="relative">
            <Input
              type={togglePassword ? "text" : "password"}
              placeholder="enter your password "
              name="password"
              control={control}
            />
            {errors.password && (
              <p className="mt-2 text-red-600 text-sm">
                {errors.password.message}
              </p>
            )}
            {!togglePassword ? (
              <IconEyeCloss
                onClick={() => setTogglePassword(true)}
              ></IconEyeCloss>
            ) : (
              <IconEyseOpen
                onClick={() => setTogglePassword(false)}
              ></IconEyseOpen>
            )}
          </div>
        </div>
        <div className=" mt-2 font-normal">
          you already have an acount?{" "}
          <NavLink className="text-blue-700 font-normal" to={"/sign-in"}>
            Login
          </NavLink>
        </div>
        <button
          type="submit"
          className={`px-9  py-3 text-center bg-primary mt-8 rounded-xl mx-auto font-semibold ${
            isSubmitting ? "opacity-50 pointer-events-none" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
