import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";

export default function RsvpModal({ isOpen, close }) { 
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdg82RDWh1kMRJOw8qhP27Xm5N14yd3sZuEZy4OV8NZkxN31g/viewform?embedded=true";
  const THANK_YOU_PATH  = "/forms/d/e/"; // substring stays constant

  /** Close when the iframe navigates to the “formResponse” page */
  const handleLoad = (e) => {
    const src = e.currentTarget.contentWindow.location.href;
    if (src.includes("formResponse")) close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={close}>
          <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0.95, opacity: 0.15 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.95, opacity: 0.15 }}
              transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
              className="h-full flex flex-col"
            >
              <DialogHeader className="p-6 pb-4">
                <DialogTitle className="text-2xl font-bold">
                  RSVP to Event
                </DialogTitle>
              </DialogHeader>

              {/* live Google Form */}
              <iframe
                src={GOOGLE_FORM_URL}
                title="RSVP Form"
                onLoad={handleLoad}
                className="flex-1 border-0"
              />

            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
