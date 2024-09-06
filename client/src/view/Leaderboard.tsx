import Navbar from "@/components/navbar";
import RouteAnimation from "@/components/route-animation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const nav = useNavigate();
  return (
    <>
      <RouteAnimation>
        <Navbar />
        <div className="h-[64px]"></div>
        <div className="navigation h-[64px] w-full flex flex-row justify-start items-center p-2">
          <div className="">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                nav(-1);
              }}
            >
              <ArrowLeft />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100dvh-128px)] overflow-hidden">
          <div className="border rounded-md w-3/4 mx-auto my-4 py-4">
            <h3 className="text-4xl text-center font-amsterdam">
              Your highest score
            </h3>
            <div className="my-4 w-full flex flex-row justify-around items-center font-redhat">
              <AnimatePresence mode="popLayout">
                <motion.div
                  className="w-1/4 h-[100px] px-4 border rounded-md"
                  initial={{ opacity: 0, translateY: -100 }}
                  animate={{ opacity: 1, translateY: 1 }}
                >
                  <h6 className="text-center py-2 font-bold border-b">
                    Easy mode
                  </h6>
                </motion.div>
                <motion.div
                  className="w-1/4 h-[100px] px-4 border rounded-md"
                  initial={{ opacity: 0, translateY: -100 }}
                  animate={{ opacity: 1, translateY: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h6 className="text-center py-2 font-bold border-b">
                    Normal mode
                  </h6>
                </motion.div>
                <motion.div
                  className="w-1/4 h-[100px] px-4 border rounded-md"
                  initial={{ opacity: 0, translateY: -100 }}
                  animate={{ opacity: 1, translateY: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h6 className="text-center py-2 font-bold border-b">
                    Hard mode
                  </h6>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="py-4 px-8">
            <h1 className="text-center font-amsterdam text-6xl ">
              Global Leaderboard
            </h1>

            <hr className="my-8 w-1/2 mx-auto" />

            <div className="pb-6" id="EASY-SECTION">
              <h3 className="text-2xl font-amsterdam pb-8">Easy mode</h3>
              <div className="user-block h-[64px] w-full border rounded-md flex flex-row justify-start">
                <div className="avatar-section h-full aspect-square flex flex-row justify-center items-center">
                  ...
                </div>
                <div className="detail-section w-1/2 ml-4 h-full flex flex-col justify-evenly items-start">
                  <div className="name-section">
                    <h6 className="font-amsterdam text-xl">Username</h6>
                  </div>
                  <div className="score-section font-semibold">4:00</div>
                </div>
              </div>
            </div>

            <hr className="my-8 w-1/6 mx-auto" />

            <div className="pb-6" id="NORMAL-SECTION">
              <h3 className="text-2xl font-amsterdam pb-8">Normal mode</h3>
              <div className="user-block h-[64px] w-full border rounded-md flex flex-row justify-start">
                <div className="avatar-section h-full aspect-square flex flex-row justify-center items-center">
                  ...
                </div>
                <div className="detail-section w-1/2 ml-4 h-full flex flex-col justify-evenly items-start">
                  <div className="name-section">
                    <h6 className="font-amsterdam text-xl">Username</h6>
                  </div>
                  <div className="score-section font-semibold">4:00</div>
                </div>
              </div>
            </div>

            <hr className="my-8 w-1/6 mx-auto" />

            <div className="pb-6" id="HARD-SECTION">
              <h3 className="text-2xl font-amsterdam pb-8">Hard mode</h3>
              <div className="user-block h-[64px] w-full border rounded-md flex flex-row justify-start">
                <div className="avatar-section h-full aspect-square flex flex-row justify-center items-center">
                  ...
                </div>
                <div className="detail-section w-1/2 ml-4 h-full flex flex-col justify-evenly items-start">
                  <div className="name-section">
                    <h6 className="font-amsterdam text-xl">Username</h6>
                  </div>
                  <div className="score-section font-semibold">4:00</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </RouteAnimation>
    </>
  );
}
