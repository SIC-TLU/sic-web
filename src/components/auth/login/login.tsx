"use client"

import { useState } from "react";
import FormLogin from "./formLogin";
import LogoSIC from "../logoSIC";
import ModalVerifyAccount from "../modal-verify-account";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <div className="min-h-screen bg-[#141517] flex items-center justify-center flex-wrap">
        <div className="w-1/2 h-auto flex justify-center pb-10">
          <LogoSIC />
        </div>
        <div className="w-1/2 h-auto">
          <FormLogin setIsModalOpen={setIsModalOpen} />
        </div>
        {/* Footer */}
        <div className="absolute bottom-0 pb-8 text-center text-gray-500 text-xs">
          Copyright &copy; SicClub 2024
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <ModalVerifyAccount setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
