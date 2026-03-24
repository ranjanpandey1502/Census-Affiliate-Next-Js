import Button from "@/components/common/button/Button";
import Spinner from "@/components/common/Spinner";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import useNotification from "@/providers/notification/useNotification";
import { APP_PATHS } from "@/router/paths";
import ApiService from "@/services/Api.service";
import { EmailSchema } from "@/utils/schema/UserSchema";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import Link from "next/link";

const InitialValue = {
  email: "",
};

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<{ email: string }>>({});
  const [values, setValues] = useState<{ email: string }>(InitialValue);
  const { showNotification } = useNotification();

  async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const results = EmailSchema.safeParse(values.email);
    if (!results.success) {
      const fieldErrors: Partial<{ email: string }> = {};
      results.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof { email: string };
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      setIsLoading(true);
      const res = await ApiService.forgotPassword(values.email);
      if (res.status === 200) {
        showNotification({
          notificationType: "success",
          title: "Reset Email sent",
          message:
            "A email has been sent to the provided email to reset password",
        });
      }
    } catch (error) {
      console.trace(error);
      showNotification({
        notificationType: "error",
        title: "Failed to Reset password",
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
              Forgot Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Opp! Forgot your password
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
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={onSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : <span>Send Mail</span>}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                <Link
                  to={APP_PATHS.singUpPage}
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
