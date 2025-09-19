import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand / About */}
        <div>
          <h2 className="text-lg font-semibold text-white">Fetii Bot</h2>
          <p className="mt-2 text-xs text-gray-400">
            AI-powered analyzer for your trip data
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-sm font-semibold text-white">Quick Links</h2>
          <ul className="mt-2 space-y-1 text-xs">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/chat" className="hover:text-white">
                Chat
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Connect</h2>
          <ul className="mt-2 space-y-1 text-xs">
            <li className="flex items-center gap-2">
              <a href="mailto:">support@fetii-bot.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <p className="text-center text-xs text-gray-500 py-3">
          © {new Date().getFullYear()} Fetii Bot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
