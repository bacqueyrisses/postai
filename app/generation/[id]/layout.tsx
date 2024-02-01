import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main
      className={
        "text-3xl md:text-6xl font-normal justify-start items-center gap-3 flex flex-col"
      }
    >
      {children}
    </main>
  );
}
