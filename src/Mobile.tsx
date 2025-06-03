import { Card, CardContent } from "@/components/ui/card";
import ActionsBar            from "@/components/ActionsBar";
import AnimatedHeadline from '@/components/AnimatedHeadline';



export const Mobile = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* --------------------- background --------------------- */}
      <div className="relative min-h-screen bg-[#242526] border border-black/50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/smoky-bckrnd.png')] bg-cover bg-center blur-[28px] opacity-10" />
          <img
            src="/strokes.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        </div>

        {/* --------------------- content ---------------------- */}
        <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
            <div
              className="
                flex flex-col lg:flex-row-reverse        /* ticket right ≥ lg */
                items-center lg:items-start
                gap-10 xl:gap-16
                max-w-[1400px] mx-auto
              "
            >
              {/* ---------- HEADLINE + BUTTONS (left column) ---------- */}
              <div
                className="
                  flex flex-col
                  items-center lg:items-start
                  justify-between
                  w-full max-w-[420px]            /* narrower than ticket */
                  min-h-[60vh] lg:min-h-0         /* keeps space on tall mobile */
                  mb-8                            /* lifts off bottom edge */
                "
              >
              {/* Animated headline */}
              <AnimatedHeadline
                text="EARLY BIRD TICKET"
                className="
                  text-4xl sm:text-6xl lg:text-7xl
                  font-extrabold tracking-wider
                  text-center lg:text-left
                "
              />

                {/* ---------- TICKET (right on desktop) ---------- */}
              <div className="w-full mt-10  max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] xl:max-w-[540px]">
              <img
                src={'/ticket.png'}
                alt="Early-bird ticket"
                className="w-full h-auto rounded-t-3xl shadow-lg select-none"
                draggable={false}
              />
              </div>
   
            </div>
            {/* Action buttons */}
              <div className="w-full">
                <ActionsBar />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
