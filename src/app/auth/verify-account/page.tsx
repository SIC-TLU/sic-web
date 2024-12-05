"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import authApiRequest from "@/apiRequest/auth";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { showInfoToast } from "@/lib/ultils-client";

const SUCCESS_STARTUS_CODE = 200;

export default function Page() {
  const router = useRouter()
  const { username } = useAuthContext()
  const [inputValue, setInputValue] = useState<string>("")

  useEffect(() => {
    if (!username) router.push('/auth/register')
  }, [router, username])

  const handleSubmit = async () => {
    const data = {
      username,
      codeId: inputValue
    }
    const result = await authApiRequest.verifyAccount(data)

    if(result.statusCode === 200) {
      showInfoToast({ description: "Verify account successfully." })
    }
    
    if (result.statusCode === SUCCESS_STARTUS_CODE) {
      router.push('/')
    }
  }

  return (
    <div className="w-dvw h-dvh flex items-center justify-center bg-[#dadee6]">
      <div className="flex flex-col justify-between bg-white w-1/3 h-2/4 rounded-md px-10 py-8">
        <div>
          <p className="text-xl font-semibold">Verify your account</p>
          <p>The code has been sent to your email, please check your email.</p>
          <Separator className="mb-10 mt-4" />
          <label className="flex items-center gap-1 mb-2" htmlFor="input-code">
            <p>Code</p>
            <span className="text-red-500">*</span>
          </label>
          <Input
            id="input-code"
            value={inputValue}
            placeholder="Enter your code here..."
            className="focus-visible:ring-1 focus-visible:ring-offset-1"
          onChange={(e) => setInputValue(e.target.value)}
          />
          <p className="mt-3 text-sm">
            The code will expired 5 mitutes after you create it. If expires, please request to
            <span className="cursor-pointer hover:text-blue-500 underline"> regenerate the code</span>
          </p>
        </div>

        <div>
          <Separator className="mb-4" />
          <div className="w-full flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/">
                <ChevronLeftIcon />
                Home page
              </Link>
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">
                  Cancel
                </Link>
              </Button>
              <Button
                className="px-8"
                onClick={handleSubmit}
              >
                Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
