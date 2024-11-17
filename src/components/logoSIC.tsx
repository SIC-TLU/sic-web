import Image from "next/image";

export default function LogoSIC() {
  return (
    <div className="w-auto">
      {/* Logo Section */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="SIC Logo"
          width={100}
          height={10}
          className="h-[106px] w-[136px]"
        />
      </div>

      {/* Welcome Text */}
      <div>
        <h1 className="text-white text-3xl font-semibold mb-3">
          Welcome back to <span className="text-orange-500">SIC</span>
        </h1>
        <p className="text-white text-sm">Student help student master technology</p>
      </div>
    </div>
  );
}
