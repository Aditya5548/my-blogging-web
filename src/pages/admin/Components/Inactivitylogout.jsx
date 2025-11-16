// hooks/useAutoLogout.js
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Inactivitylogout(timeout = 1 * 60 * 1000) { // default 15 minutes
  const router = useRouter();
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // Perform logout
      Cookies.remove("token"); // remove your auth token
      window.location.reload() // refresh the page
    }, timeout);
  };

  useEffect(() => {
    // Reset timer on any user activity
    const events = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Start initial timer
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}
