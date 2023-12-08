export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={
        "text-3xl md:text-6xl font-normal md:font-normal  justify-center items-center"
      }
    >
      {children}
    </main>
  );
}
