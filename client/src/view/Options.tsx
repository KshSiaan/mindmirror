import Navbar from "@/components/navbar";
import RouteAnimation from "@/components/route-animation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const audioOptions = [
  { label: "Background Music", func: () => {} },
  { label: "Sound effects", func: () => {} },
];
const videoOptions = [
  { label: "Fullscreen", func: () => {} },
  { label: "3d mode", func: () => {} },
  { label: "Vsync", func: () => {} },
];

export default function Options() {
  const nav = useNavigate();

  return (
    <>
      <RouteAnimation>
        <Navbar />
        <main className="pt-[64px] flex flex-row justify-center items-center">
          <motion.div
            className="w-4/5 border-l border-r border-b px-4"
            initial={{ opacity: 0, translateY: -500 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              mass: 0.5,
            }}
          >
            <div className="navigation h-[64px] w-full flex flex-row justify-between items-center p-2">
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

              <div className="text-sm font-bold pr-4">options</div>
            </div>
            <hr />

            <div className="p-2">
              <h2 className="font-amsterdam text-xl p-4 text-center">
                Audio Options
              </h2>
              {audioOptions.map((item, index) => (
                <div
                  className="w-full flex flex-row justify-between items-center py-2 px-4"
                  key={index}
                >
                  <label
                    htmlFor={item.label}
                    className="cursor-pointer font-redhat font-semibold text-md"
                  >
                    {item.label}
                  </label>
                  <Checkbox id={item.label} />
                </div>
              ))}
              <h2 className="font-amsterdam text-xl p-4 text-center">
                Video Options
              </h2>
              {videoOptions.map((item, index) => (
                <div
                  className="w-full flex flex-row justify-between items-center py-2 px-4"
                  key={index}
                >
                  <label
                    htmlFor={item.label}
                    className="cursor-pointer font-redhat font-semibold text-md"
                  >
                    {item.label}
                  </label>
                  <Checkbox id={item.label} />
                </div>
              ))}
              <h2 className="font-amsterdam text-xl p-4 text-center">Others</h2>
              <div className="w-full flex flex-row justify-between items-center py-2 px-4">
                <label
                  htmlFor="mouseloc"
                  className="cursor-pointer font-redhat font-semibold text-md"
                >
                  Mouse location
                </label>
                <Checkbox id="mouseloc" />
              </div>
            </div>
          </motion.div>
        </main>
      </RouteAnimation>
    </>
  );
}
