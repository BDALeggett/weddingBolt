import { useState, useCallback } from "react";

/** Validation helpers */
const validatePhone = (n) => n.replace(/\D/g, "").length >= 10;
const formatPhone   = (n) => {
  const c = n.replace(/\D/g, "");
  const m = c.match(/^(\d{3})(\d{3})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : n;
};

/** State + business logic (no JSX) */
export function useSmsModal() {
  const [isOpen, setIsOpen]                 = useState(false);
  const [step, setStep]                     = useState("phone"); // phone | verify | success
  const [phone, setPhone]                   = useState("");
  const [code, setCode]                     = useState("");
  const [consent, setConsent]               = useState(false);
  const [showToast, setShowToast]           = useState(false);

  /* open / close ---------------------------------------------------------------- */
  const open  = useCallback(() => {
    setIsOpen(true);
    setStep("phone");
    setPhone("");
    setCode("");
    setConsent(false);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  /* handlers -------------------------------------------------------------------- */
  const sendCode = () => {
    if (!validatePhone(phone) || !consent) return;
    console.log("Sending SMS to:", phone);
    setStep("verify");
  };

  const verifyCode = () => {
    if (code.length !== 6) return;
    console.log("Verified code", code, "for", phone);
    setStep("success");
    setShowToast(true);
    /* auto-dismiss after 2 s + fade toast */
    setTimeout(() => {
      close();
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  return {
    /* state */
    isOpen,
    step,
    phone,
    code,
    consent,
    showToast,

    /* actions for UI */
    open,
    close,
    setPhone,
    setCode:   (v) => setCode(v.replace(/\D/g, "").slice(0, 6)),
    setConsent,
    sendCode,
    verifyCode,
    validatePhone,
    formatPhone,
  };
}
