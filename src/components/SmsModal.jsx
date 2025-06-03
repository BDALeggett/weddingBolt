import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Send, Check } from "lucide-react";

/**
 * Stateless component – everything comes from props.
 */
export default function SmsModal(props) {
  const {
    isOpen,
    close,
    step,
    phone,
    code,
    consent,
    showToast,
    setStep,
    setPhone,
    setCode,
    setConsent,
    validatePhone,
    formatPhone,
    sendCode,
    verifyCode,
  } = props;

  return (
    <>
      {/* -------- MAIN DIALOG -------- */}
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
              <motion.div
                initial={{ scale: 0.95, opacity: 0.15 }}
                animate={{ scale: 1,    opacity: 1 }}
                exit={{    scale: 0.95, opacity: 0.15 }}
                transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
              >
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Phone size={24} />
                    SMS Updates
                  </DialogTitle>
                </DialogHeader>

                {/* STEP 1 – enter phone */}
                {step === "phone" && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0,   opacity: 1 }}
                    className="space-y-4 pt-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <label className="flex gap-3 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      I consent to receive SMS updates about this event.
                    </label>

                    <motion.button
                      onClick={sendCode}
                      disabled={!validatePhone(phone) || !consent}
                      className="w-full flex items-center justify-center gap-2 p-3 bg-orange-500 text-white rounded-lg disabled:bg-gray-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{  scale: 0.98 }}
                    >
                      <Send size={18} />
                      Send Verification Code
                    </motion.button>
                  </motion.div>
                )}

                {/* STEP 2 – verify code */}
                {step === "verify" && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0,  opacity: 1 }}
                    className="space-y-4 pt-4"
                  >
                    <p className="text-sm text-gray-600">
                      We sent a 6-digit code to <strong>{formatPhone(phone)}</strong>
                    </p>

                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="000000"
                      className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest"
                      maxLength={6}
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={() => props.setStep("phone")}
                        className="flex-1 p-3 border rounded-lg"
                      >
                        Back
                      </button>
                      <motion.button
                        onClick={verifyCode}
                        disabled={code.length !== 6}
                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg disabled:bg-gray-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{  scale: 0.98 }}
                      >
                        <Check size={18} />
                        Verify
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 – success */}
                {step === "success" && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1,   opacity: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Check size={32} className="text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Success!</h3>
                    <p className="text-gray-600">You'll receive SMS updates.</p>
                  </motion.div>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* -------------- Success toast -------------- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <Check size={20} />
            <span>SMS updates enabled!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
