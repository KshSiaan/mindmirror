import Navbar from "@/components/navbar";
import RouteAnimation from "@/components/route-animation";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  useEffect(() => {
    document.title = "MindMirror - Home";
  }, []);

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
        <main className="font-redhat h-[calc(100dvh-128px-128px)] w-dvw flex justify-center items-center">
          <div className="font-amsterdam">
            <ul className=" text-6xl md:text-8xl">
              <AnimatePresence mode="popLayout">
                <motion.li
                  className="relative"
                  whileHover={{ translateX: 50 }}
                  key={0}
                >
                  <Link to="/easymode">Easy Mode</Link>
                  <motion.div
                    initial={{ width: "100%" }}
                    whileInView={{ width: "0%" }}
                    viewport={{ amount: "all", once: true }}
                    className="absolute h-full bg-foreground top-0 right-0"
                  ></motion.div>
                </motion.li>
                <motion.li
                  className="relative"
                  whileHover={{ translateX: 50 }}
                  key={1}
                >
                  <Link to="/level">Normal Mode</Link>
                  <motion.div
                    initial={{ width: "100%" }}
                    whileInView={{ width: "0%" }}
                    viewport={{ amount: "all", once: true }}
                    transition={{ delay: 0.2 }}
                    className="absolute h-full bg-foreground top-0 right-0"
                  ></motion.div>
                </motion.li>
                <motion.li
                  className="relative"
                  whileHover={{ translateX: 50 }}
                  key={2}
                >
                  <Link to="/level">Hard Mode</Link>
                  <motion.div
                    initial={{ width: "100%" }}
                    whileInView={{ width: "0%" }}
                    viewport={{ amount: "all", once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute h-full bg-foreground top-0 right-0"
                  ></motion.div>
                </motion.li>
              </AnimatePresence>
            </ul>
          </div>

          <span className="absolute bottom-0 left-[50%] translate-x-[-50%] text-sm font-medium text-zinc-700 pb-2">
            Developed by Shahibul hasan
          </span>
        </main>
      </RouteAnimation>
    </>
  );
}
