import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Hello SIC</p>
      <Button>Click me!</Button>
      <Button>
      <Link href={"/login"}>
        Login
      </Link>
      </Button>
    </div>
  );
}
