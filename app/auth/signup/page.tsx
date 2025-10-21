"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleButton from "../components/GoogleButton";
import Link from "next/link";

// 模拟注册 API
const fakeSignup = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!agree) newErrors.agree = "You must agree to Privacy Policy and Terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      await fakeSignup({ firstName, lastName, email, password });
      alert("Signup successful");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    key: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen">
        <div className="h-[48px] pr-4 flex justify-end items-center text-sm text-center text-gray-500">
          <span className="pr-2">Already have an account?</span>
          <Link href="/auth/login">
            <Button size="sm" className="cursor-pointer rounded-[2rem] bg-[#415af9]/90 hover:bg-[#415af9]">
              Login
            </Button>
          </Link>
        </div>
        <div className="min-h-[calc(100vh-48px)] flex flex-col justify-center items-center py-4">
          <div className="w-[420px] max-w-md p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">
              Sign up
            </h1>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Use your email or another services to continue, signing up is free!
            </p>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <GoogleButton />

              <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 text-gray-500 text-sm">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <Label className="pb-2 font-normal text-[#333]">First Name</Label>
                  <Input
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={handleChange(setFirstName, "firstName")}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <Label className="pb-2 font-normal text-[#333]">Last Name</Label>
                  <Input
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={handleChange(setLastName, "lastName")}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="pb-2 font-normal text-[#333]">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleChange(setEmail, "email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label className="pb-2 font-normal text-[#333]">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleChange(setPassword, "password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="accent-indigo-500"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked);
                    if (errors.agree) setErrors((prev) => ({ ...prev, agree: "" }));
                  }}
                />
                <span>
                  I agree to the{" "}
                  <Link href="/privacy-policy" className="text-indigo-600">
                    Privacy Policy
                  </Link>
                  <span className="px-1">and</span>
                  <Link href="/terms-service" className="text-indigo-600">
                    Terms of Use
                  </Link>
                </span>
              </label>
              {errors.agree && <p className="text-red-500 text-xs">{errors.agree}</p>}

              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#5b70f8]/90 hover:bg-[#5b70f8]"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Sign Up"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
