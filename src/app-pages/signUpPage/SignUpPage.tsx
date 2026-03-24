'use client'
import AuthLayout from "@/components/layouts/AuthPageLayout";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
