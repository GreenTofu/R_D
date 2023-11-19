import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import appLogo from "assets/app-logo.png";
import eyeIcon from "assets/icons/ic-eye.jpg";
import facebookIcon from "assets/icons/ic-facebook.jpg";
import githubIcon from "assets/icons/ic-github.jpg";
import eastIcon from "assets/icons/ic-hemisphereeast.jpg";
import ovalBlack from "assets/oval-black.png";
import ovalLarge from "assets/oval-lg.png";
import ovalSmall from "assets/oval-sm.png";
import rectBlack from "assets/rect-black.png";
import rectRed from "assets/rect-red.png";
import ErrorMessage from "components/errorMessage";
import useUserStore from "store/userStore";
import { emailValidator, passwordValidator } from "utils/validator";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [passwordState, setPasswordState] = useState(false);

  const { signInAction } = useUserStore();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signInAction(data);

      navigate("/resources");
    } catch (error) {
      const errorData = error.response.data;

      const errorField = errorData?.field || "email";

      setError(errorField, {
        type: "400",
        message: errorData.message,
      });
    }
  };

  return (
    <div className="relative z-0 min-h-screen bg-neutral-150">
      <img
        src={ovalBlack}
        className="absolute -top-32 -left-24 scale-60"
        alt="oval"
      />
      <img
        src={rectRed}
        className="absolute w-32 h-14 left-0 bottom-1/4"
        alt="oval"
      />
      <img
        src={rectBlack}
        className="absolute w-28 h-10 right-0 top-1/3"
        alt="oval"
      />

      <div className="flex justify-center h-screen">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <img src={appLogo} alt="Logo" className="w-1/3" />
            <p className="mt-4">
              Employee performance & competency review platform
            </p>
            <div className="flex justify-between w-1/4 mt-4">
              <img
                src={githubIcon}
                alt="github icon"
                className="w-7 h-7"
              />
              <img
                src={facebookIcon}
                alt="facebook icon"
                className="w-7 h-7"
              />
              <img
                src={eastIcon}
                alt="east icon"
                className="w-8 h-8"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative 2xl:px-16 sm:px-12 2xl:py-28 sm:py-14 rounded border shadow bg-white">
            <img
              className="absolute -top-16 -right-16 -z-10 scale-75"
              src={ovalSmall}
              alt="oval"
            />
            <img
              className="absolute -bottom-28 -left-24 -z-10 scale-75"
              src={ovalLarge}
              alt="oval"
            />
            <h3 className="text-center font-extrabold text-4xl text-neutral-900 mb-2 font-inter">
              Welcome back
            </h3>
            <p className="text-center text-lg text-neutral-500">
              Please enter your credentials to sign in.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
              <p className="mb-1 text-base font-bold text-neutral-600">
                Email
              </p>
              <input
                name="email"
                type="email"
                id="email"
                className="w-[450px] h-12 text-base px-4 py-2 border font-normal border-neutral-500 rounded focus:outline-none placeholder-neutral-400"
                placeholder="user@bbv.vn"
                {...register("email", emailValidator)}
              />

              <div className="h-2">
                <ErrorMessage message={errors.email?.message} />
              </div>

              <p className="mb-1 text-base font-bold text-neutral-600 mt-4">
                Password
              </p>
              <div className="relative">
                <input
                  type={passwordState ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-[450px] h-12 text-base px-4 py-2 border font-normal border-neutral-500 rounded focus:outline-none placeholder-neutral-400"
                  placeholder="Enter your password"
                  {...register("password", passwordValidator)}
                />
                <button
                  type="button"
                  onClick={() => setPasswordState(!passwordState)}
                >
                  <img
                    src={eyeIcon}
                    alt="eye icon"
                    className="w-5 absolute top-4 right-4"
                  />
                </button>
              </div>
              <div className="h-2">
                <ErrorMessage message={errors.password?.message} />
              </div>

              <button
                type="submit"
                className="w-[450px] h-[44px] 2xl:mt-28 sm:mt-14 mb-3 text-lg flex justify-center items-center bg-neutral-900 text-white p-1 rounded-lg cursor-pointer"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
