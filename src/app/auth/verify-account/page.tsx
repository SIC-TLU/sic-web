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
import { resendCodeBody } from "@/schemaValidations/auht.schema";
import { z } from "zod";

const SUCCESS_STARTUS_CODE = 200;

export default function Page() {
  const router = useRouter()
  const { username } = useAuthContext()
  const [inputValue, setInputValue] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [isResendCode, setIsResendCode] = useState<boolean>(false)
  const [error, setError] = useState<string[]>([])

  useEffect(() => {
    if (!username) router.push('/auth/register')
  }, [router, username])

  const handleSubmit = async () => {
    const data = {
      username,
      codeId: inputValue
    }
    const result = await authApiRequest.verifyAccount(data)

    if (result.statusCode === 200) {
      showInfoToast({ description: "Verify account successfully." })
    }

    if (result.statusCode === SUCCESS_STARTUS_CODE) {
      router.push('/')
    }
  }

  const handleChangeToResendCode = async () => {
    setIsResendCode(true)
    const result = await authApiRequest.getEmailByUsername({ username })

    if (result.statusCode === 200) {
      setEmail(result.data?.email as string)
    }
  }

  const handleResendCode = async () => {
    try {
      resendCodeBody.parse(email)
      setError([])

      const result = await authApiRequest.resendCode({ email })

      if (result.statusCode === 200) {
        showInfoToast({ description: result.message as string });
        setIsResendCode(false)
      }

    } catch (error) {
      if(error instanceof z.ZodError) {
        setError(error.flatten().formErrors)
      } else {
        setError(['An unknow error'])
      }
    }
  }

  return (
    <div className="w-dvw h-dvh flex items-center justify-center bg-[#dadee6]">
      <div className="flex flex-col justify-between bg-white w-1/3 h-2/4 rounded-md px-10 py-8">
        <div>
          <p className="text-xl font-semibold">Verify your account</p>
          <p>The code has been sent to your email, please check your email.</p>
          <Separator className="mb-10 mt-4" />

          {isResendCode ? (
            <>
              <label className="flex items-center gap-1 mb-2" htmlFor="input-email">
                <p>Email</p>
                <span className="text-red-500">*</span>
              </label>
              <Input
                id="input-email"
                value={email}
                placeholder="Enter your email here..."
                className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-300"
                disabled
              />
              {error && error.length > 0 && (
                <p className="text-destructive text-sm mt-2 ml-1">{error[0]}</p>
              )}
              <p className="text-sm mt-4">This is your email. Please click Resencode button to recieve new code.</p>
              <p className="text-sm text-blue-500">The code will be valid within 5 minutes of being sent back</p>
            </>
          ) : (
            <>
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
                <span className="cursor-pointer hover:text-blue-500 underline" onClick={handleChangeToResendCode}> regenerate the code</span>
              </p>
            </>
          )}

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

            {isResendCode ? (
              <div className="w-full flex items-center justify-end gap-4">
              <Button
                variant="ghost"
                onClick={() => setIsResendCode(false)}
              >
                Back
              </Button>
              <Button className="px-8" onClick={handleResendCode}>Resend Code</Button>
            </div>
            ): (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
