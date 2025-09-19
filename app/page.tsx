"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <main className="flex flex-col items-center text-center gap-10 max-w-2xl">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          Welcome to <span className="text-purple-600">Fetii Bot</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 max-w-md">
          Analyze your trip data and ask smart questions instantly. Choose how
          you would like to begin:
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-6 w-full justify-center">
          <button
            onClick={() => router.push("/upload")}
            className="px-8 py-4 w-full sm:w-auto rounded-xl text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-transform transform hover:scale-105"
          >
            Upload Trip Details Excel & Start Chat
          </button>

          <button
            onClick={() => router.push("/chat")}
            className="px-8 py-4 w-full sm:w-auto rounded-xl text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-lg transition-transform transform hover:scale-105"
          >
            Start Chat on Pre-Existing Data
          </button>
        </div>
      </main>
    </div>
  );
}
