import type { AffiliateLinkSchema } from "@/utils/schema/AffiliateSchema";
import type { ResetPasswordSchema, SignInSchema, SignUpSchema } from "@/utils/schema/UserSchema";
import {z} from "zod";
export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type SignUpErrorType = Partial<Record<keyof SignUpFormValues, string>>;
export type SignInFormValues = z.infer<typeof SignInSchema>;
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
export type AffiliateLinkFormValues = z.infer<typeof AffiliateLinkSchema>;
export type AffiliateLinkErrorType = Partial<Record<keyof AffiliateLinkFormValues, string>>;