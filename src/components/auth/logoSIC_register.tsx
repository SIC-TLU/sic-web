import Image from "next/image";

export default function LogoSICRegister() {
  return (
    <div className="w-auto">
      {/* Logo Section */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="SIC Logo"
          width={100}
          height={10}
          priority
          className="h-[106px] w-[136px]"
        />
      </div>

      {/* Welcome Text */}
      <div>
        <h1 className="text-white text-3xl font-semibold mb-3">
          Welcome to the <span className="text-orange-500">SIC</span>
        </h1>
        <p className="text-white text-sm">Sign up to get ready for an exciting journey with SIC</p>
      </div>
    </div>
  );
}
