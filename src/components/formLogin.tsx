"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import { Eye, EyeClosed } from "lucide-react";

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);

  //Show/Hide password
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  //Object check
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  //Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 hover:opacity-85">
              <Checkbox className="border-[#E0E9E8]" />
              <label className="text-sm font-medium text-[#E0E9E8]">
                Remember
              </label>
            </div>
            <Link
              href={"/"}
              className="text-sm text-[#E0E9E8] underline hover:opacity-85"
            >
              {" "}
              Forgot password{" "}
            </Link>
          </div>

          <Button
            className=" w-full bg-orange-500 hover:bg-orange-600 text-white text-xl mb-2 py-5"
            type="submit"
          >
            Log in
          </Button>
          <p className="text-center text-sm mt-1">
                You do not have an account?{' '}
            <Link href={"/register"} className="text-orange-500 hover:underline">
            Sign Up
            </Link>
            </p>
        </form>
      </Form>
    </Card>
  );
}
