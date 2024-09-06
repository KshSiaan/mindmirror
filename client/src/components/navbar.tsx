import { ModeToggle } from "../components/ui/mode-toggle";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
// import { Howl } from "howler";

export default function Navbar() {
  const { theme } = useTheme();
  const [logo, setLogo] = useState(theme);
  useEffect(() => {
    setLogo(theme);
  }, [theme]);
  // useEffect(() => {
  //   const sound = new Howl({
  //     src: ["audio/mindMirror.ogg"],
  //     loop: true,
  //     volume: 0.5,
  //   });

  //   sound.play();

  //   // Cleanup the sound when the component unmounts
  //   return () => {
  //     sound.stop();
  //   };
  // }, []);

  return (
    <>
      <div className="absolute top-0 left-0 h-[48px] md:h-[64px] w-dvw border-b flex justify-between items-center px-2">
        <div className="h-full w-auto flex justify-start items-center">
          <div className="h-3/5 aspect-square">
            <img
              src={"img/logo-" + logo + ".svg"}
              alt=""
              className="h-full w-full aspect-square"
            />
          </div>

          <span className="pl-2 font-amsterdam text-xl md:text-2xl">
            MindMirror
          </span>
        </div>
        <ModeToggle />
      </div>
    </>
  );
}
