import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth()

  console.log('session: ', session)

  return (
    <div>
      <p>Hello SIC</p>
      <Button>Click me!</Button>
      <Button>
      <Link href={"/auth/login"}>
        Login
      </Link>
      </Button>
    </div>
  );
}
