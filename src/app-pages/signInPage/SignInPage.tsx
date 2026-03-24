'use client'
import AuthLayout from "@/components/layouts/AuthPageLayout";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
