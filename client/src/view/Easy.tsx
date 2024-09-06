import Navbar from "@/components/navbar";
import RouteAnimation from "@/components/route-animation";
import { Button } from "@/components/ui/button";
import checkUser from "@/extra/checkUser";
import { EasyLevel } from "@/levles/levels";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Easy() {
  const nav = useNavigate();

  const levelArr: {
    id: number;
    src: string;
    revealed: boolean;
    found: boolean;
  }[] = [];

  const [level, setLevel] = useState<
    | Array<{ id: number; src: string; revealed: boolean; found: boolean }>
    | undefined
  >(undefined);

  const [switchArr, setSwitchArr] = useState<Array<number>>([]);
  const [tempArrForIndex, setTempArrForIndex] = useState<Array<number>>([]);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  // const [matched, setMatched] = useState<number>(0);

  const [user, setUser] = useState<{ name: string; email: string }>();

  const [cookie] = useCookies();

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

    document.title = "MindMirror - Easy";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    for (let i = 0; i < EasyLevel.length; i++) {
      levelArr.push(EasyLevel[i]);
      levelArr.push(EasyLevel[i]);
    }
    // console.log(levelArr);
    setLevel(levelArr);

    //shuffle
    for (let i = levelArr.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [levelArr[i], levelArr[random]] = [levelArr[random], levelArr[i]];
    }

    console.log("Updated level:", level);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log("Updated level:", level);

    if (level) {
      const areAllValuesSame = (
        arr: Array<{
          id: number;
          src: string;
          revealed: boolean;
          found: boolean;
        }>
      ) => {
        return arr.every((obj) => obj.found === true);
      };
      if (areAllValuesSame(level)) {
        setGameEnded(true);

        setTimeout(() => {
          nav("/");
        }, 3000);
      }
      console.log(areAllValuesSame(level));
    }
    // console.log("Game ended with ", gameEnded);
  }, [gameEnded, level, nav]);

  function cardClicked(index: number) {
    if (!level) return;

    function revealCard(defIndex: number) {
      if (level) {
        const updatedLevel = level.map((item, i) =>
          i === defIndex ? { ...item, revealed: true } : item
        );
        setLevel(updatedLevel);
      }
    }

    function markAsFound() {
      if (level) {
        const updatedLevel = level.map((item, i) => {
          const isMatched =
            i === tempArrForIndex[0] || i === tempArrForIndex[1];
          const updatedItem = isMatched
            ? { ...item, found: true, revealed: true }
            : item;
          return updatedItem;
        });

        console.log("Before setting level in markAsFound:", updatedLevel);
        setLevel(updatedLevel);
      }
    }

    function resetCards() {
      if (level) {
        const updatedLevel = level.map((item) =>
          item.revealed && !item.found ? { ...item, revealed: false } : item
        );
        setLevel(updatedLevel);
      }
    }

    if (switchArr.length === 0) {
      switchArr.push(level[index].id);
      tempArrForIndex.push(index);
      revealCard(index);
    } else if (switchArr.length === 1) {
      switchArr.push(level[index].id);
      tempArrForIndex.push(index);
      revealCard(index);

      setTimeout(() => {
        if (switchArr[0] === switchArr[1]) {
          markAsFound();
        } else {
          resetCards();
        }

        setSwitchArr([]);
        setTempArrForIndex([]);
      }, 500);
    }
  }

  return (
    <>
      <RouteAnimation>
        <Navbar />
        <div className="h-[64px]" />

        <div
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-8"
          style={
            gameEnded
              ? {}
              : {
                  display: "none",
                }
          }
        >
          <p className="font-amsterdam text-8xl text-center">Well done!!</p>
          <p className="text-center font-redhat font-bold text-2xl">
            You finished the game in 4:00
          </p>
        </div>

        <div className="h-[calc(100dvh-64px)] flex flex-col md:flex-row justify-between items-start">
          <div className="w-full h-[48px] md:w-2/12 md:h-full order-1">
            <div className="flex flex-row h-full pr-4 md:pr-0 md:h-auto justify-start items-center">
              <div className="navigation h-[64px] w-full md:w-min flex flex-row justify-between md:justify-start items-center p-2">
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
              <h2 className="text-center font-amsterdam text-2xl h-auto md:h-[7%] flex flex-row justify-center items-end">
                {user ? user.name : ""}
              </h2>
            </div>
            <div className="h-[93%] w-full hidden md:block">
              <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/52376b0c-5714-4e57-976b-21ae4387187b/df3uw2q-83a1d62e-eff8-4884-bac1-9be208f4a098.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUyMzc2YjBjLTU3MTQtNGU1Ny05NzZiLTIxYWU0Mzg3MTg3YlwvZGYzdXcycS04M2ExZDYyZS1lZmY4LTQ4ODQtYmFjMS05YmUyMDhmNGEwOTgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.r4zB3iOUvzHI3PyAylnN7Y0QtDnHFxUamgp_duiXtuE"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="w-[90%] md:w-8/12 h-full order-3 md:order-2 mx-auto md:mx-0">
            <div className="game-table three-d-game-table w-full h-full grid grid-cols-4 grid-rows-4">
              {level
                ? level.map((item, index) => (
                    <motion.div
                      className="card-container flex flex-row justify-center items-center "
                      key={index}
                      onClick={() => {
                        // item.revealed = !item.revealed;
                        // console.log(item);

                        cardClicked(index);
                      }}
                    >
                      <div
                        className={
                          "card w-[80%] md:h-[80%] aspect-square relative cursor-pointer"
                        }
                        style={
                          item.revealed ? { transform: "rotateY(0deg)" } : {}
                        }
                      >
                        <img
                          src={item.src}
                          className="front h-full object-cover rounded-md"
                        ></img>
                        <img
                          src="cards/back.svg"
                          className="back rounded-md top-0 left-0 h-full w-full"
                        />
                      </div>
                    </motion.div>
                  ))
                : ""}
            </div>
          </div>

          <div className="w-full h-[48px] md:w-2/12 md:h-full order-2">
            <h2 className="text-center font-amsterdam text-4xl md:h-[7%] flex flex-row justify-center items-end">
              Time: 4:00
            </h2>
            <div className="h-[93%] w-full hidden md:block">
              <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8bb21ed-434e-4d55-b5d0-410fe988fb30/dgzx3v4-7e7816ba-23a6-4140-929f-b37626a655d2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U4YmIyMWVkLTQzNGUtNGQ1NS1iNWQwLTQxMGZlOTg4ZmIzMFwvZGd6eDN2NC03ZTc4MTZiYS0yM2E2LTQxNDAtOTI5Zi1iMzc2MjZhNjU1ZDIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.CmpQzoMJjf3EM4tzf0gF9sL2W_P-WqRjboeVK81epSk"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </RouteAnimation>
    </>
  );
}
