import { useState, useCallback } from "react";
import { useCountdown } from "@/hooks/useCountdown";

/** Returns modal state + handlers only (no JSX) */
export function useDropboxModal() {
  const [isOpen, setIsOpen] = useState(false);

  /* stable callbacks (memoised once) */
  const open  = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  /* countdown ticks independently; nothing here re-opens the dialog */
  const countdown = useCountdown("2025-09-06T17:00:00");

  return { isOpen, open, close, countdown };
}