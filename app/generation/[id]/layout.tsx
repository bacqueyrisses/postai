import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main
      className={
        "flex flex-col items-center justify-start gap-3 text-3xl font-normal md:text-6xl"
      }
    >
      {children}
    </main>
  );
}
