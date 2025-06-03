// src/components/ActionsBar.jsx
import { motion } from "framer-motion";
import { Calendar, MessageSquare, Droplets, Phone } from "lucide-react";

import { useRsvpModal }     from "@/hooks/useRsvpModal";
import { useCalendarModal } from "@/hooks/useCalendarModal";
import { useDropboxModal }  from "@/hooks/useDropboxModal";
import { useSmsModal }      from "@/hooks/useSmsModal";

import RsvpModal     from "@/components/RsvpModal";
import CalendarModal from "@/components/CalendarModal";
import DropboxModal  from "@/components/DropboxModal";
import SmsModal      from "@/components/SmsModal";

import "./buttons.css";

export default function ActionsBar() {
  /* ------------------ RSVP ------------------ */
  const {
    isOpen: isRsvpOpen,
    open:   openRsvp,
    close:  closeRsvp,
    /* any extra handlers… */
  } = useRsvpModal();

  /* ------------------ Calendar -------------- */
  const {
    isOpen:          isCalOpen,
    open:            openCal,
    close:           closeCal,
    platform:        calPlatform,
    handleGoogle:    calGoogle,
    handleIcsDownload: calIcs,
    handleNativeCalendar: calNative,
  } = useCalendarModal();

  /* ------------------ Dropbox --------------- */
  const {
    isOpen:   isDbxOpen,
    open:     openDropbox,
    close:    closeDropbox,
    countdown: dbxCountdown,
  } = useDropboxModal();

  /* ------------------ SMS ------------------- */
  const sms = useSmsModal();
  const { open: openSms } = sms;

  /* ---------- button defs ---------- */
  const defaultClassName ="w-full bg-[#242526a1] hover:bg-[#242526] rounded-full border-[3px] border-[#f5f5dc] py-4 md:py-6 flex items-center justify-between px-6 md:px-8 transition-all";
  const buttons = [
    {
      id: "rsvp",
      label: "RSVP",
      icon: MessageSquare,
      onClick: openRsvp,
      className:
        "w-full max-w-[400px] mx-auto bg-[#f5f5dc] hover:bg-[#e5e5c5] text-[#black] hover:text-black rounded-full py-4 md:py-6 flex items-center justify-between px-6 md:px-8 transition-all",
    },
    {
      id: "calendar",
      label: "Add to Calendar",
      icon: Calendar,
      onClick: openCal,
      className:
        defaultClassName},
    {
      id: "dropbox",
      label: "Dropbox (Countdown)",
      icon: Droplets,
      onClick: openDropbox,
      className:
        defaultClassName},
    {
      id: "sms",
      label: "SMS Updates",
      icon: Phone,
      onClick: openSms,
      className:
        defaultClassName},
  ];

  /* ---------- render ---------- */
  return (
    <>
      {/* Action buttons */}
      <div className="actions-bar-container"> 
        <div className="flex overflow-x-auto flex-col sm:flex-row gap-4 p-6  bg-[#242526] rounded-t-3xl backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
          {buttons.map((btn) => {
            const Icon = btn.icon;
            return (
              <motion.button
                key={btn.id}
                onClick={btn.onClick}
                className={`
                  flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-white font-semibold
                  transition-all duration-100 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50
                  min-w-[200px] sm:min-w-[160px] ${btn.className}
                `}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay:
                    btn.id === "rsvp"
                      ? 0
                      : btn.id === "calendar"
                      ? 0.1
                      : btn.id === "dropbox"
                      ? 0.2
                      : 0.3,
                }}
              >
                <Icon size={20} />
                <span className="text-sm sm:text-base">{btn.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* --------------- Modals --------------- */}
      <RsvpModal   isOpen={isRsvpOpen}   close={closeRsvp} />
      <CalendarModal
        isOpen={isCalOpen}
        close={closeCal}
        platform={calPlatform}
        handleGoogle={calGoogle}
        handleIcsDownload={calIcs}
        handleNativeCalendar={calNative}
      />
      <DropboxModal
        isOpen={isDbxOpen}
        close={closeDropbox}
        countdown={dbxCountdown}
      />
      <SmsModal {...sms} />    </>
  );
}
