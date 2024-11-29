"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { registerForm, RegisterFormType } from "@/schemaValidations/auht.schema";
import authApiRequest from "@/apiRequest/auth";
import { showInfoToast } from "@/lib/ultils-client";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  //Show/Hide password
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  //Show/Hide repassword
  const toggleConfirmPasswordVisibility = () => {
    setshowConfirmPassword((prevState) => !prevState);
  };

  //Define your form
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerForm),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  //Define a submit handler
  async function onSubmit(values: RegisterFormType) {
    const { username, email, password } = values
    const result = await authApiRequest.register({ username, email, password })

    if (result?.data) {
      localStorage.setItem("userId", JSON.stringify(result.data._id))
      showInfoToast({ description: result.message as string })
      router.push("/auth/verify")
    }
  }

  return (
    <Card className=" max-w-sm w-full bg-[#141517] border-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel
                    className="absolute bg-[#141517] p-2 top-[-50%] left-6 translate-y-[10%] text-white text-sm"
                    style={{
                      lineHeight: "0.7rem",
                    }}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-[#141517]  text-white border border-gray-700 focus:outline-none focus:ring focus:ring-orange-500 py-5"
                      name="email"
                      autoComplete="off"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel
                    className="absolute bg-[#141517] p-2 top-[-50%] left-6 translate-y-[10%] text-white text-sm"
                    style={{
                      lineHeight: "0.7rem",
                    }}
                  >
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-[#141517]  text-white border border-gray-700 focus:outline-none focus:ring focus:ring-orange-500 py-5"
                      name="username"
                      autoComplete="off"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel
                    className="absolute bg-[#141517] p-2 top-[-50%] left-6 translate-y-[10%] text-white text-sm"
                    style={{
                      lineHeight: "0.5rem",
                    }}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-[#141517] text-white border border-gray-700 focus:outline-none focus:ring focus:ring-orange-500 py-5"
                      type={showPassword ? "text" : "password"}
                      name="pass"
                      autoComplete="off"
                    />
                  </FormControl>
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer text-white"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel
                    className="absolute bg-[#141517] p-2 top-[-50%] left-6 translate-y-[10%] text-white text-sm"
                    style={{
                      lineHeight: "0.5rem",
                    }}
                  >
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-[#141517] text-white border border-gray-700 focus:outline-none focus:ring focus:ring-orange-500 py-5"
                      type={showConfirmPassword ? "text" : "password"}
                      name="pass"
                      autoComplete="off"
                    />
                  </FormControl>
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer text-white"
                  >
                    {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className=" w-full bg-orange-500 hover:bg-orange-600 text-white text-xl mb-2 py-5"
            type="submit"
          >
            Sign Up
          </Button>
          <p className="flex items-center justify-center gap-2 text-sm mt-1">
            <span className="text-white">You already have an account?</span>
            <Link href={"/login"} className="text-orange-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </Form>
    </Card>
  );
}
