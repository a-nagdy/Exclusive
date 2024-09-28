export default function NotFound() {
  return (
    <>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-white">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <p className="mt-4 text-white">Let's get you back .</p>
          <a
            className="text-gray-500 py-2 px-3 bg-blue-400 rounded-lg "
            href="/"
          >
            home
          </a>
        </div>
      </div>
    </>
  );
}
