import { useState, type ChangeEvent, type MouseEvent } from "react";
import Link from "next/link";
//
import { EyeCloseIcon, EyeIcon } from "@/assets/icons";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/common/button/Button";
import ApiService from "@/services/Api.service";
import { APP_PATHS } from "@/router/paths";
import useAuth from "@/providers/auth/useAuth";
import Spinner from "@/components/common/Spinner";
import type { SignInFormValues } from "@/types/schema-validaiton.types";
import useNotification from "@/providers/notification/useNotification";
import { SignInSchema } from "@/utils/schema/UserSchema";
import axios from "axios";

const InitialValue = {
  email: "",
  password: "",
};
export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<SignInFormValues>(InitialValue);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInFormValues, string>>
  >({});
  const { showNotification } = useNotification();
  const [showPassword, setShowPassword] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const { signInUser } = useAuth();

  async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const results = SignInSchema.safeParse(values);
    if (!results.success) {
      const fieldErrors: Partial<Record<keyof SignInFormValues, string>> = {};
      results.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof SignInFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      setIsLoading(true);
      const res = await ApiService.loginUser(values.email, values.password);
      signInUser(res.data.access_token, res.data.refresh_token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          showNotification({
            notificationType: "error",
            title: err.response?.data.msg || "Login Failed"
          })
        }
      }
      console.trace(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // clear error on change
  }
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
            </div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="Enter your email"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-[12px] mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div> */}
                  <Link
                    href={APP_PATHS.forgotPassword}
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={onSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : <span>Sign in</span>}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  href={APP_PATHS.singUpPage}
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
