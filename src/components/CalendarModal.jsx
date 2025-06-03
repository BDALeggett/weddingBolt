import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Download, ExternalLink } from "lucide-react";

/**
 * Stateless presentational component.
 * Receives its props from the parent (ActionsBar).
 */
export default function CalendarModal({
  isOpen,
  close,
  platform,
  handleGoogle,
  handleIcsDownload,
  handleNativeCalendar,
}) {
  return (
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
                  <Calendar size={24} />
                  Add to Calendar
                </DialogTitle>
              </DialogHeader>

              {/* event summary */}
              <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <strong>Event:</strong> Sample Event<br />
                <strong>Date:</strong> September 6 2025<br />
                <strong>Time:</strong> 5:00 PM – 7:00 PM
              </div>

              {/* action buttons */}
              <div className="mt-6 space-y-3">
                {(platform === "web" || platform === "android") && (
                  <motion.button
                    onClick={handleGoogle}
                    className="w-full flex items-center justify-center gap-3 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{  scale: 0.98 }}
                  >
                    <ExternalLink size={18} />
                    Open Google Calendar
                  </motion.button>
                )}

                <motion.button
                  onClick={handleIcsDownload}
                  className="w-full flex items-center justify-center gap-3 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{  scale: 0.98 }}
                >
                  <Download size={18} />
                  Download .ics file
                </motion.button>

                {(platform === "ios" || platform === "android") && (
                  <motion.button
                    onClick={handleNativeCalendar}
                    className="w-full flex items-center justify-center gap-3 p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{  scale: 0.98 }}
                  >
                    <Calendar size={18} />
                    Open Native Calendar
                  </motion.button>
                )}
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
