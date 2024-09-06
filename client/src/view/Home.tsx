import Navbar from "@/components/navbar";
import RouteAnimation from "@/components/route-animation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import checkUser from "@/extra/checkUser";

export default function Home() {
  const nav = useNavigate();

  const [, setUser] = useState<{ name: string; email: string }>();

  const [cookie, , removeCookie] = useCookies();

  useEffect(() => {
    if (Object.keys(cookie).length > 0) {
      console.log(cookie);

      let user;

      checkUser(cookie.token).then((data) => {
        setUser(data);
      });

      if (user === null) {
        nav("/login");
      }
      console.log(user);

      //do something with user if needed ( can be used in a state );
    } else {
      nav("/login");
    }

    document.title = "MindMirror - Home";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RouteAnimation>
        <Navbar />
        <main className="font-redhat h-dvh w-dvw flex flex-col mt-[90px] md:mt-0 md:justify-center items-center">
          <div className="font-amsterdam">
            <motion.ul
              className=" text-6xl md:text-8xl space-y-10 md:space-y-0 text-center md:text-start"
              initial={{
                translateY: "-100px",
                translateX: "-200px",
                scale: 0,
              }}
              animate={{ translateY: "0", translateX: "0", scale: 1 }}
              transition={{
                type: "spring",
                delay: 0.2,
                duration: 0.5,
              }}
              style={{
                width: "80dvw",
              }}
            >
              <motion.li whileHover={{ translateX: "50px" }}>
                <Link to="/level">Start Game</Link>
              </motion.li>
              <motion.li whileHover={{ paddingLeft: "50px" }}>
                <Link to="/leaderboard">Leaderboard</Link>
              </motion.li>
              <motion.li whileHover={{ paddingLeft: "50px" }}>
                <Link to="/options">Options</Link>
              </motion.li>
              <motion.li
                whileHover={{ paddingLeft: "50px" }}
                onClick={() => {
                  removeCookie("token");
                }}
              >
                <Link to="/login">Logout</Link>
              </motion.li>
            </motion.ul>
          </div>

          <span className="absolute bottom-0 left-[50%] translate-x-[-50%] text-sm font-medium text-zinc-700 pb-2">
            Developed by Shahibul hasan
          </span>
        </main>
      </RouteAnimation>
    </>
  );
}
