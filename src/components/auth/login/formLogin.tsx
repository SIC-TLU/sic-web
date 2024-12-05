"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "../../ui/card";
import { Eye, EyeOffIcon } from "lucide-react";
import { LoginBody, loginBody } from "@/schemaValidations/auht.schema";
import { authenticate } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../AuthProvider";

export default function FormLogin({ setIsModalOpen }: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {
  const { setUsername } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  //Show/Hide password
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  //Define your form
  const form = useForm<LoginBody>({
    resolver: zodResolver(loginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  //Define a submit handler
  async function onSubmit(values: LoginBody) {
    const { username, password } = values
    setUsername(username)

    const res = await authenticate(username, password)
    if (res?.error) {
      if (res?.code === 2) {
        setIsModalOpen(true)
        return
      }

      toast({
        title: "Error",
        description: res.error,
        variant: "destructive"
      })
    } else {
      router.push('/')
    }
  }

  return (
    <Card className=" max-w-sm w-full bg-[#141517] border-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <p className="flex items-center justify-center gap-2 text-sm mt-1">
            <span className="text-white">You do not have an account?</span>
            <Link href={"/auth/register"} className="text-orange-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </Card>
  );
}
