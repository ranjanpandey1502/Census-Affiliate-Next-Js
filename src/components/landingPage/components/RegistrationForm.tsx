import ApiService from "@/services/Api.service";
import { ScrollReveal } from "./ScrollReveal";
import { ShieldCheck, ArrowRight } from "lucide-react";
import type {
  SignUpErrorType,
  SignUpFormValues,
} from "@/types/schema-validaiton.types";
import { SignUpSchema } from "@/utils/schema/UserSchema";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import useNotification from "@/providers/notification/useNotification";
import { useRouter } from "next/navigation";
import { APP_PATHS } from "@/router/paths";
import axios from "axios";
import Spinner from "@/components/common/Spinner";

const SELECT_CHEVRON =
  "bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%22%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231B2A4A%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[size:1.5em]";

const InitialValue = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  username: "",
  phone_no: "",
};

export function RegistrationForm() {
  const [values, setValue] = useState<SignUpFormValues>(InitialValue);
  const [errors, setErrors] = useState<SignUpErrorType>({});
  const { showNotification } = useNotification();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
      );
      setValue(InitialValue);
      router.push(APP_PATHS.signInPage);
      showNotification({
        title: "Registration Successful",
        message: "You will be able login once your account has been verified",
        notificationType: "success",
      });
    } catch (error) {
      console.trace(error);
      showNotification({
        notificationType: "error",
        title: "Registration Failed",
      });
    } finally {
      setIsLoading(false);
    }
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
    <section
      id="register"
      className="py-24 bg-background relative overflow-hidden mb-[40px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal direction="up">
              <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-3">
                Join Now
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                Become a Census Travel Partner
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Fill out the form to create your affiliate account. Approval is
                instant, and you can start generating links and earning
                commissions immediately.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg">
                      Secure & Private
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Your data is encrypted and never shared with third
                      parties.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3">
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-border/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 gold-gradient"></div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary">
                        First Name *
                      </label>
                      <input
                        required
                        name="first_name"
                        type="text"
                        className="premium-input"
                        placeholder="John"
                        value={values.first_name}
                        onChange={handleChange}
                      />
                      {errors.first_name && (
                        <p className="text-red-600 text-[12px] mt-1">
                          {errors.first_name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary">
                        Last Name *
                      </label>
                      <input
                        required
                        name="last_name"
                        type="text"
                        className="premium-input"
                        placeholder="Doe"
                        value={values.last_name}
                        onChange={handleChange}
                      />
                      {errors.last_name && (
                        <p className="text-red-600 text-[12px] mt-1">
                          {errors.last_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary">
                        Email Address *
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        className="premium-input"
                        placeholder="john@example.com"
                        value={values.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-[12px] mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary">
                        Phone Number
                      </label>
                      <input
                        name="phone_no"
                        type="tel"
                        className="premium-input"
                        placeholder="+1 (555) 000-0000"
                        value={values.phone_no}
                        onChange={handleChange}
                      />
                      {errors.phone_no && (
                        <p className="text-red-600 text-[12px] mt-1">
                          {errors.phone_no}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary">Country *</label>
                    <select required name="country" defaultValue="" className={`premium-input appearance-none ${SELECT_CHEVRON}`}>
                      <option value="" disabled>Select your country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="EU">Europe (Other)</option>
                      <option value="OT">Other</option>
                    </select>
                  </div> */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary">
                        Username *
                      </label>
                      <input
                        required
                        name="username"
                        type="text"
                        className="premium-input"
                        placeholder="Choose a username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={checkUsernameExists}
                      />
                      {errors.username && (
                        <p className="text-red-600 text-[12px] mt-1">
                          {errors.username}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary">
                        Password *
                      </label>
                      <input
                        required
                        name="password"
                        type="password"
                        className="premium-input"
                        placeholder="Create a password"
                        value={values.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <p className="text-red-600 text-[12px] mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary">
                      How did you hear about us?
                    </label>
                    <select
                      name="source"
                      defaultValue=""
                      className={`premium-input appearance-none ${SELECT_CHEVRON}`}
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

                  <div className="pt-4">
                    <button
                      onClick={onSubmit}
                      disabled={isLoading}
                      className="w-full py-4 gold-gradient text-primary rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 group"
                    >
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <>
                          Complete Registration
                          <ArrowRight
                            size={20}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                      By registering, you agree to our Affiliate Terms of
                      Service and Privacy Policy.
                    </p>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
