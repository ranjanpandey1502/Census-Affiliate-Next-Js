import { useState, type ChangeEvent, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
//
import { EyeCloseIcon, EyeIcon } from "@/assets/icons";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
// import Checkbox from "@/components/form/input/Checkbox";
import ApiService from "@/services/Api.service";
import { APP_PATHS } from "@/router/paths";
import useNotification from "@/providers/notification/useNotification";
import Spinner from "@/components/common/Spinner";
import type {
  SignUpErrorType,
  SignUpFormValues,
} from "@/types/schema-validaiton.types";
import { SignUpSchema } from "@/utils/schema/UserSchema";
import axios from "axios";

const InitialValue = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  username: "",
  phone_no: "",
  referred: ""
};

export default function SignUpForm() {
  const [values, setValue] = useState<SignUpFormValues>(InitialValue);
  const [errors, setErrors] = useState<SignUpErrorType>({});
  const [showPassword, setShowPassword] = useState(false);
  const { showNotification } = useNotification();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const results = SignUpSchema.safeParse(values);
    if (!results.success) {
      const fieldErrors: SignUpErrorType = {};
      results.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof SignUpFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      setIsLoading(true);
      await ApiService.registerUser(
        values.email,
        values.username,
        values.first_name,
        values.last_name,
        values.password,
        values.phone_no,
        values.referred
      );
      setValue(InitialValue);
      router.push(APP_PATHS.signInPage);
      showNotification({
        title: "Registration Successful",
        message: "You will be able login once your account has been verified",
        notificationType: "success",
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          showNotification({
            notificationType: "error",
            title: err.response?.data.msg || "Registration Failed",
          });
        }
        console.log(err.response?.data?.success)
        if (err.response?.data?.success === false) {
          setErrorMsg(err.response?.data?.data);
        }
      } else {
      console.trace(err);
        showNotification({
          notificationType: "error",
          title: "Registration Failed",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // clear error on change
  }
  function checkUsernameExists() {
    if (values.username) {
      ApiService.userNameExists(values.username)
        .then(() => {
          setErrors((prev) => ({ ...prev, username: undefined }));
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            console.log(err.response?.status);
            if (err.response?.status === 400) {
              setErrors((prev) => ({
                ...prev,
                username: err.response?.data.msg,
              }));
            }
          }
          console.trace(err);
        });
    }
  }
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:te[10px]-gray-400">
              Want to be part of our affiliate program? 
            </p>
            <div className="mt-2 ">
              {errorMsg && (
                <p className="text-red-600 text-sm mt-1">{errorMsg}</p>
              )}
            </div>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
            </div>
            <form>
              <div className="space-y-5">
                <div>
                  <Label>
                    Username<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={checkUsernameExists}
                    placeholder="Enter username"
                  />
                  {errors.username && (
                    <p className="text-red-600 text-[12px] mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={values.first_name}
                      onChange={handleChange}
                      placeholder="Enter your First name"
                    />
                    {errors.first_name && (
                      <p className="text-red-600 text-[12px] mt-1">
                        {errors.first_name}
                      </p>
                    )}
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      placeholder="Enter your Last name"
                    />
                    {errors.last_name && (
                      <p className="text-red-600 text-[12px] mt-1">
                        {errors.last_name}
                      </p>
                    )}
                  </div>
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-[12px] mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label>
                    Phone No
                  </Label>
                  <Input
                    type="text"
                    id="phone_no"
                    name="phone_no"
                    value={values.phone_no}
                    onChange={handleChange}
                    onBlur={checkUsernameExists}
                    placeholder="Enter phone No"
                  />
                  {errors.phone_no && (
                    <p className="text-red-600 text-[12px] mt-1">
                      {errors.phone_no}
                    </p>
                  )}
                </div>
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-[12px] mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-primary">
                      How did you hear about us?
                    </Label>
                    <select
                      name="referred"
                      defaultValue=""
                      value={values.referred}
                      className={`premium-input appearance-none`}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Please select an option
                      </option>
                      <option value="search">Search Engine (Google)</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Friend or Colleague</option>
                      <option value="blog">Blog/Article</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                <div className="flex items-center gap-3">
                  {/* <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  /> */}
                  <p className="inline-block font-normal text-gray-500 dark:te[10px]-gray-400">
                    By registering, you agree to our Affiliate Terms of
                      Service and Privacy Policy.
                  </p>
                </div>
                <div>
                  <button
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                    onClick={onSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 [10px]:text-start">
                Already have an account? {""}
                <Link
                  href={APP_PATHS.signInPage}
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
