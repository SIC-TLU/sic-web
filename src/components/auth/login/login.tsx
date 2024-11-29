import FormLogin from "./formLogin";
import LogoSIC from "../logoSIC";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#141517] flex items-center justify-center flex-wrap">
      <div className="w-1/2 h-auto flex justify-center pb-10">
        <LogoSIC />
      </div>
      <div className="w-1/2 h-auto">
        <FormLogin/>
      </div>
      {/* Footer */}
      <div className="absolute bottom-0 pb-8 text-center text-gray-500 text-xs">
        Copyright &copy; SicClub 2024
      </div>
    </div>
  );
}
