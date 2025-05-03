export default function LayoutBackgroundLiner({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-baseline p-8 min-h-screen w-full text-gray-900">
      <div className="fixed inset-0 -z-30 bg-gradient-to-br from-amber-100 via-sky-200 to-red-200" />
      <div className="fixed inset-0 -z-20 bg-[repeating-linear-gradient(to bottom, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 20px)]" />
      <div className="fixed inset-0 -z-10 bg-white/40 backdrop-blur-sm" />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
