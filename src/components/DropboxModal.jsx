import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { PackageOpen, Lock, ExternalLink } from "lucide-react";
import { useDropboxModal } from "@/hooks/useDropboxModal";

export default function  DropboxModal({ isOpen, close, countdown }) {
  /* hook gives us the *current* countdown + open/close flags */

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={close}>
          <DialogContent className="max-w-full max-h-full w-screen h-screen p-0 border-0 bg-transparent">
            <motion.div
              initial={{ scale: 0.95, opacity: 0.15 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.95, opacity: 0.15 }}
              transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full h-full bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-2xl flex flex-col items-center justify-center text-white overflow-hidden"
            >

              {/* Accessible heading (sr-only if you don’t want it visible) */}
              <DialogHeader>
                <DialogTitle className="sr-only">Dropbox countdown</DialogTitle>
              </DialogHeader>

              {/* ------------ body ------------- */}
              <div className="relative z-10 text-center space-y-8 p-8">
                <PackageOpen size={80} className="mx-auto mb-6 text-blue-300" />
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Add Your Photos Here!
                </h1>
                <p className="text-xl md:text-2xl text-white/80">
                  This will be available in:
                </p>

                {/* counter boxes */}
                <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
                  {[
                    { label: "Days",    value: countdown.days },
                    { label: "Hours",   value: countdown.hours },
                    { label: "Minutes", value: countdown.minutes },
                    { label: "Seconds", value: countdown.seconds },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <div className="text-3xl md:text-5xl font-mono font-bold bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
                        {String(value).padStart(2, "0")}
                      </div>
                      <p className="mt-2 text-sm md:text-lg text-white/70 uppercase tracking-wider">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  disabled={true}
                  onClick={close}
                  // className="flex items-center gap-3 mx-auto px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20"
                  className="flex text-gray-500 items-center gap-3 mx-auto px-8 py-4 bg-white/10  rounded-xl border border-white/20"
                  >
                  {/* <ExternalLink size={20} /> */}
                  <Lock size={20} className="text-white" />
                  <span className="text-lg font-semibold ">Open Dropbox</span>
                </button>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
