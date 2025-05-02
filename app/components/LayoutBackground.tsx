export default function LayoutBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-baseline p-8 h-screen">
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center -z-10" />
      <div className="absolute inset-0 bg-black opacity-30 -z-10" />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
