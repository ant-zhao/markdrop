"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleButton from "../components/GoogleButton";
import Link from "next/link";

// 模拟登录 API
const fakeLogin = async (data: { email: string; password: string }) => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

export default function LoginForm() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email";

    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      await fakeLogin({ email, password });
      alert("Login successful");
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

  const redirectUri = params.get('redirect_uri') || "/";

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen">
        <div className="h-[48px] pr-4 flex justify-end items-center text-sm text-center text-gray-500">
          <span className="pr-2">Don’t have an account?</span>
          <Link href={`/auth/signup${redirectUri ? `?redirect_uri=${redirectUri}` : ""}`} className="text-indigo-600 hover:underline" replace>
            <Button size="sm" className="cursor-pointer rounded-[2rem] bg-[#415af9]/90 hover:bg-[#415af9]">
              Sign up
            </Button>
          </Link>
        </div>
        <div className="min-h-[calc(100vh-48px)] flex flex-col justify-center items-center py-4">
          <div className="w-[420px] max-w-md p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">
              Log in
            </h1>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <GoogleButton redirectUri={redirectUri} />

              <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 text-gray-500 text-sm">or</span>
                <hr className="flex-1 border-gray-300" />
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

              <div className="text-right text-sm text-blue-600 hover:underline">
                <Link href="#">Forgot Password?</Link>
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#5b70f8]/90 hover:bg-[#5b70f8]"
                disabled={submitting}
              >
                {submitting ? <Loader className="animate-spin" size={20} /> : "Login"}
              </Button>
            </form>
            <p className="text-sm text-gray-500 mt-6">
              By logging in, you agree to our{" "}
              <Link href="/privacy-policy" className="text-indigo-600">
                Privacy Policy
              </Link>
              <span className="px-1">and</span>
              <Link href="/terms-service" className="text-indigo-600">
                Terms of Use
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
