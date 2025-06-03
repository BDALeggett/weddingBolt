import { useState, useCallback } from "react";

/** Simple open/close hook for the RSVP dialog */
export function useRsvpModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open  = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}
