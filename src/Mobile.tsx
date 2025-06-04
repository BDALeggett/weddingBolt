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
          {/* <img
            src="/strokes.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          /> */}
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
              {/* Animated headline */}
              <AnimatedHeadline
                text="EARLY BIRD TICKET"
                className="mt-20 flex flex-row
                  text-3xl sm:text-5xl lg:text-7xl
                  font-extrabold tracking-wider
                  text-center lg:text-left
                "
              />
              <div
                className="
                  flex flex-col
                  items-center
                  w-full max-w-[420px]
                  min-h-[60vh] lg:min-h-0 
                "
              >
              

                {/* ---------- TICKET (right on desktop) ---------- */}
              <div className="w-full mt-10 ml-12 mb-0 max-w-[400px] sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[540px]">
              <img
                src={'/ticket2.jpg'}
                alt="Early-bird ticket"
                className=" h-auto rounded-t-3xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 select-none "
                draggable={false}
              />
              </div>                 
            </div>


            <div className="relative  border-[3px] border-[#f5f5dc]
                  flex items-center justify-center  gap-3 px-3 pb-4 pt-4 rounded-xl text-white font-semibold
                  transition-all duration-100 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50
                  min-w-[200px] sm:min-w-[160px] w-full max-w-[350px]
                ">
                  <div className="absolute left-5">
                    <span className="pr-5">$</span>
                    <span className="pr-5 text-gray-500 text-decoration-line: line-through">500.00</span>
                    <span className="text-grey">FREE</span>
                  </div>

                  <div className="flex justify-end items-center w-full text-xl">
                  <div className="flex items-centre space-x-4">
                      <span className="flex justify-center items-center mt-1 pb-1 text-center text-gray-500 rounded-full border-[2px] hover:bg-gray-600 border-gray-500 w-6 h-6">+</span>
                      <span className="text-center justify-center text-gray-500 mx-2 ">0</span>
                      <span className="flex justify-center items-center mt-1 pb-1 text-gray-500 rounded-full  border-[2px] hover:bg-gray-600 border-gray-500 w-6 h-6">-</span>
                    </div>
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
