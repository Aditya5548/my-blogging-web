import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevents hydration mismatch (flash of wrong theme)
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center transition-colors duration-300 fixed bottom-3 right-3">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-6 py-3 rounded-lg bg-gray-600 text-white dark:bg-white dark:text-black hover:brightness-90 transition font-bold"
      >
      {theme}
      </button>
    </div>
  );
}