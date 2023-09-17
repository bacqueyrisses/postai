import { UserButton } from "@clerk/nextjs";
import { kv } from "@vercel/kv";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import Image from "next/image";

export const revalidate = 1;

export default async function ProfilePage() {
  const user: User | null = await currentUser();
  const favoriteUrls = await kv.lrange(`${user?.id}_favorites`, 0, -1);

  return (
    <div>
      {favoriteUrls.map((favoriteUrl) => (
        <div className={"flex"}>
          <Image
            src={favoriteUrl}
            alt={"virtual postcard"}
            width={500}
            height={500}
          />
        </div>
      ))}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
