export default function Layout({ children }: { children: React.ReactNode }) {
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
