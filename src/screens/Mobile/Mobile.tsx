import { MailIcon, CalendarIcon, BellIcon, ImageIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Mobile = (): JSX.Element => {
  const moreOptions = [
    {
      title: "Announcement Opt-In",
      icon: <BellIcon className="w-6 h-6 md:w-8 md:h-8 text-[#f5f5dc]" />,
    },
    {
      title: "Add to Calendar",
      icon: <CalendarIcon className="w-6 h-6 md:w-8 md:h-8 text-[#f5f5dc]" />,
    },
    {
      title: "Photo Dropbox",
      icon: <ImageIcon className="w-6 h-6 md:w-8 md:h-8 text-[#f5f5dc]" />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="relative w-full min-h-screen overflow-hidden bg-[#242526] border border-solid border-black">
        {/* Background Image Layer */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 blur-[28.35px] opacity-[0.08] bg-[url(/smoky-bckrnd.png)] bg-cover bg-center" />
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            alt="Strokes"
            src="/strokes.png"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 max-w-[1400px] mx-auto">
            {/* Ticket Section */}
            <div className="w-full lg:w-[500px] xl:w-[600px] mx-auto lg:mx-0">
              <Card className="relative bg-black rounded-[16px_16px_0px_0px] border-none max-w-[600px] mx-auto">
                <CardContent className="p-0">
                  {/* Ticket Header with Three Dots */}
                  <div className="relative">
                    <img
                      className="w-full h-auto"
                      alt="Wedding Photo"
                      src="/mask-group-2.png"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#f5f5dc]" />
                      <div className="w-2 h-2 rounded-full bg-[#f5f5dc]" />
                      <div className="w-2 h-2 rounded-full bg-[#f5f5dc]" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="[font-family:'Roboto_Mono',Helvetica] font-bold text-white text-xl md:text-2xl">
                        JONATHAN &amp; HALEY
                        <br />
                        WEDDING &apos;26
                      </h2>
                      <span className="[font-family:'Sometype_Mono',Helvetica] font-bold text-[#88cbff] text-xs md:text-sm tracking-wider">
                        EARLY BIRD
                      </span>
                    </div>

                    <div className="flex flex-col items-end space-y-2 mb-6">
                      <p className="[text-shadow:3px_3px_3.7px_#000000fa] [font-family:'Sometype_Mono',Helvetica] font-bold text-white text-sm md:text-base">
                        Monday the 15th September 2025
                      </p>
                      <a
                        className="[font-family:'Sometype_Mono',Helvetica] font-semibold text-white text-sm md:text-base hover:text-[#88cbff] transition-colors"
                        href="https://maps.google.com/?q=1+Nrg+Park,+Houston,+TX+77054"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        1 Nrg Park, Houston, TX 77054
                      </a>
                    </div>

                    {/* Barcode Section */}
                    <div className="relative bg-white p-4 rounded">
                      <div className="flex items-center justify-between">
                        <img
                          className="w-3/4 h-auto"
                          alt="Barcode"
                          src="/image-4.png"
                        />
                        <div className="text-right">
                          <p className="[font-family:'Sometype_Mono',Helvetica] font-bold text-black text-[10px] md:text-xs mb-2">
                            ALL DAY PASS
                            <br />
                            UNLMTD ACCESS
                          </p>
                          <img
                            className="w-10 h-10 md:w-12 md:h-12 ml-auto"
                            alt="Star"
                            src="/star-1.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions Section */}
            <div className="w-full lg:w-[350px] xl:w-[400px] flex flex-col gap-6 lg:sticky lg:top-8 mx-auto lg:mx-0">
              {/* RSVP Button */}
              <Button className="w-full max-w-[400px] mx-auto bg-[#f5f5dc] hover:bg-[#e5e5c5] text-black rounded-full py-4 md:py-6 flex items-center justify-between px-6 md:px-8 transition-all">
                <span className="[font-family:'Playfair_Display',Helvetica] font-bold text-base md:text-lg tracking-[4.43px]">
                  RSVP
                </span>
                <MailIcon className="w-6 h-6 md:w-8 md:h-8" />
              </Button>

              {/* More Options Section */}
              <div className="w-full max-w-[400px] mx-auto bg-[#242526] rounded-t-3xl overflow-hidden">
                <div className="bg-[#f5f5dc] rounded-t-3xl py-3 px-6 mb-4">
                  <h3 className="[font-family:'Playfair_Display',Helvetica] font-bold text-black text-base md:text-lg tracking-[4.43px] text-center">
                    MORE STUFF!!!
                  </h3>
                </div>

                <div className="flex flex-col gap-4 p-4 max-h-[400px] overflow-y-auto">
                  {moreOptions.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full bg-[#242526a1] hover:bg-[#242526] rounded-full border-[3px] border-[#f5f5dc] py-4 md:py-6 flex items-center justify-between px-6 md:px-8 transition-all"
                    >
                      <span className="[font-family:'Playfair_Display',Helvetica] font-bold text-[#f5f5dc] text-sm md:text-base lg:text-lg tracking-[4.43px]">
                        {option.title}
                      </span>
                      {option.icon}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};