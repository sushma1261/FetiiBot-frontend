"use client";

import { useAuth } from "../utils/AuthContext";

export default function ProtectedContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, login } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold mb-4">
          Please log in to continue
        </h2>
        <button
          onClick={login}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
