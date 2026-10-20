// Vises mens en side lastes ved navigering. Header og footer ligger i layouten og blir stående.
export default function Loading() {
  return (
    <main
      role="status"
      className="mx-auto w-full max-w-5xl animate-pulse px-4 py-16"
    >
      <span className="sr-only">Laster …</span>
      <div className="h-10 w-64 rounded-lg bg-gray-200" />
      <div className="mt-4 h-4 w-full max-w-2xl rounded bg-gray-200" />
      <div className="mt-2 h-4 w-2/3 max-w-xl rounded bg-gray-200" />
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="h-72 rounded-2xl bg-gray-200" />
        <div className="h-72 rounded-2xl bg-gray-200" />
      </div>
    </main>
  );
}
