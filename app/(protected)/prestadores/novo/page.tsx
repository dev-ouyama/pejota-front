export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid  gap-4 md:grid-cols-3">
        <div className="bg-muted/50 h-48 col-span-full rounded-xl" />
        <div className="bg-muted/50 col-start-1 col-span-1 h-64 rounded-xl" />
        <div className="bg-muted/50 col-start-2 col-span-2 h-64 rounded-xl" />
        <div className="bg-muted/50 col-start-1 col-span-2 h-48 rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
