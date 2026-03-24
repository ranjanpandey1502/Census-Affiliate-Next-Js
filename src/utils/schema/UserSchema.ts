import { z } from "zod";

const PasswordSchema = z
  .string()
  .min(6, "Password must contain at least 6 characters")
  .max(20, "Password cannot contain more than 20 characters");
export const EmailSchema = z.email();

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "Username must contain more than 2 character ")
    .max(20, "Username must contain less than 20 characters"),
  email: EmailSchema,
  first_name: z
    .string()
    .trim()
    .min(1, "Please Enter First name")
    .max(10, "First name can not be more than 10 characters"),
  last_name: z
    .string()
    .trim()
    .min(1, "Please Enter Last name")
    .max(10, "Last name can not be more than 10 characters"),
  password: PasswordSchema,
  phone_no: z.string().optional(),
});

export const ResetPasswordSchema = z
  .object({
    password: PasswordSchema,
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
