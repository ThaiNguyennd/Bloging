import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconEyeCloss from "../components/icons/IconEyeCloss";
import IconEyseOpen from "../components/icons/IconEyseOpen";
import Input from "../components/input/Input";
import Lable from "../components/lable/Lable";
import Logo from "./Logo";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/Auth-context";
const SignInPage = () => {
  const [togglePassword, setTogglePassword] = useState();
  const schema = yup
    .object()
    .shape({
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
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: "",
    mode: "onChange",
  });
  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const handleSignIp = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      if (error.message.includes("wrong-password"))
        toast.error("It seems your password was wrong");
    }
  };
  return (
    <div className="mx-auto w-full max-w-[1024px] mt-14">
      <Logo></Logo>
      <form
        onSubmit={handleSubmit(handleSignIp)}
        className="flex flex-col max-w-[800px] mx-auto"
        autoComplete="off"
      >
        <div className="">
          <Lable htmlFor="email">Email adress</Lable>
          <Input
            type="text"
            name="email"
            control={control}
            placeholder="enter your email address"
          ></Input>
          {errors.email && (
            <div className="mt-2 text-sm text-red-500">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="mt-10 relative">
          <Lable htmlFor="password">Password </Lable>
          <div className="relative">
            <Input
              type={togglePassword ? "text" : "password"}
              name="password"
              control={control}
              placeholder="enter your password "
            >
              {errors.password && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </span>
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
            </Input>
          </div>
        </div>
        <div className=" mt-2 font-normal">
          you have not account?{" "}
          <NavLink className="text-blue-700 font-normal" to={"/sign-up"}>
            Sign up
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
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
