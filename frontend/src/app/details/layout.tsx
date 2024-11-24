
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main className="flex flex-col gap-4 justify-center items-center w-full h-full bg-base-200 px-5">
      {children}
    </main>
  );
}
