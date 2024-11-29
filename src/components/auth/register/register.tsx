import LogoSICRegister from "../logoSIC_register";
import RegisterForm from "./formRegister";


export default function Register() {
  return (
    <div className="min-h-screen bg-[#141517] flex items-center justify-center flex-wrap">
      <div className="w-1/2 h-auto flex justify-center pb-10">
        <LogoSICRegister />
      </div>
      <div className="w-1/2 h-auto">
        <RegisterForm/>
      </div>
      
      <div className="absolute bottom-0 pb-8 text-center text-gray-500 text-xs">
        Copyright &copy; SicClub 2024
      </div>
    </div>
  );
}
