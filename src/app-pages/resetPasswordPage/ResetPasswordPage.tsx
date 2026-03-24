'use client'
import { EyeCloseIcon, EyeIcon } from "@/assets/icons";
import Button from "@/components/common/button/Button";
import Spinner from "@/components/common/Spinner";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import useNotification from "@/providers/notification/useNotification";
import { APP_PATHS } from "@/router/paths";
import ApiService from "@/services/Api.service";
import type { ResetPasswordFormValues } from "@/types/schema-validaiton.types";
import { ResetPasswordSchema } from "@/utils/schema/UserSchema";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const InitialValue = {
  password: "",
  confirm_password: "",
};
export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{token: string}>();
  const [errors, setErrors] = useState<
    Partial<Record<keyof ResetPasswordFormValues, string>>
  >({});
  const [values, setValues] = useState<ResetPasswordFormValues>(InitialValue);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showNotification } = useNotification();
  const router = useRouter();

  async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const results = ResetPasswordSchema.safeParse(values);
    if (!results.success) {
      const fieldErrors: Partial<
        Record<keyof ResetPasswordFormValues, string>
      > = {};
      results.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ResetPasswordFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    const token = params?.token;
    if(!token) return;
    try {
      setIsLoading(true);
      const res = await ApiService.resetPassword(values.password, token as string);
      if (res.status === 200) {
        router.push(APP_PATHS.signInPage);
      }
    } catch (error) {
      console.trace(error);
      showNotification({
        notificationType: "error",
        title: "Failed to reset password",
      });
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
              Reset your password
            </h1>
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
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your Password"
                      value={values.password}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
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
                <div>
                  <Label>
                    Confirm Password{" "}
                    <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Confirm Password"
                      value={values.confirm_password}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      onChange={handleChange}
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                  {errors.confirm_password && (
                    <p className="text-red-600 text-[12px] mt-1">
                      {errors.confirm_password}
                    </p>
                  )}
                </div>

                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={onSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : <span>Reset</span>}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                <Link
                  href={APP_PATHS.singUpPage}
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
