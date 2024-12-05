"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import authApiRequest from "@/apiRequest/auth";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./AuthProvider";

const SUCCESS_STARTUS_CODE = 200;

export default function ModalVerifyAccount({ setIsModalOpen }: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {
  const router = useRouter()
  const { username } = useAuthContext()
  const [inputValue, setInputValue] = useState<string>("")

  const handleSubmit = async () => {
    const data = {
      username,
      codeId: inputValue
    }
    const result = await authApiRequest.verifyAccount(data)
    
    if (result.statusCode === SUCCESS_STARTUS_CODE) {
      router.push('/')
    }
  }

  return (
    <div className="absolute flex flex-col justify-between w-2/6 h-2/4 p-4 bg-white top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-md">
      <div>
        <p className="text-2xl font-semibold">Active account</p>
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
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <p className="mt-3 text-sm">
          The code will expired 5 mitutes after you create it. If expires, please request to
          <span className="cursor-pointer hover:text-blue-500 underline"> regenerate the code</span>
        </p>
      </div>

      <div>
        <Separator className="mb-4" />
        <div className="w-full flex items-center justify-end gap-4">
          <Button
            variant="ghost"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button className="px-8" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  )
}
