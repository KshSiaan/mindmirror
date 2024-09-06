import Navbar from "@/components/navbar";
import RouteAnimation from "@/components/route-animation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { terms } from "@/extra/terms";
import { Minimize2 } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import checkUser from "@/extra/checkUser";
export default function Register() {
  const [modal, setModal] = useState(false);
  const [, setCookie] = useCookies();

  //form catching
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [repass, setRepass] = useState<string>("");
  const checkBoxRef = useRef<HTMLInputElement | null>();

  const [nameErr, setNameErr] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [passErr, setPassErr] = useState<string>("");
  const [repassErr, setRepassErr] = useState<string>("");

  const [cookie] = useCookies();

  const nav = useNavigate();

  useEffect(() => {
    if (Object.keys(cookie).length > 0) {
      nav("/");
      console.log(cookie);
      checkUser(cookie.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validateForm()) {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          pass: pass,
        }),
      });
      if (!response.ok) {
        const data = await response.json();

        console.log(data);

        setEmailErr(data.email);
        setPassErr(data.pass);

        throw new Error("Fetch operation failed");
      }
      const data = await response.json();
      console.log(data._id);

      setCookie("token", data._id, {
        maxAge: 604800, // 7 days in seconds
      });

      nav("/");
    }
  }

  function validateForm() {
    const format = /[^A-Za-z0-9 _]/;
    if (name.length >= 3) {
      if (!format.test(name)) {
        setName("");
      } else {
        setNameErr("Please use a valid name");
      }
    } else {
      setNameErr("Please use a name at least 3 characters long");
      return false;
    }
    if (email.length <= 0) {
      setEmailErr("Please use an Email");
      return false;
    } else {
      setEmailErr("");
    }
    if (pass.length >= 8) {
      setPassErr("");
    } else {
      setPassErr("Please use a password at least 8 characters long");
      return false;
    }
    if (pass != repass) {
      setRepassErr("The password and the retyped password doesnt match");
      return false;
    } else {
      setRepassErr("");
    }

    return true;
  }

  return (
    <>
      <RouteAnimation>
        <Navbar />
        <div className="h-[64px]"></div>

        <ScrollArea className="h-[calc(100dvh-68px)] w-dvw">
          <div className="h-full w-full flex flex-col justify-start items-center">
            <form
              className="w-4/5 md:w-2/5 py-6 border rounded-md flex flex-col justify-start items-center gap-y-10 mt-4"
              onSubmit={handleSubmit}
            >
              <h2 className="text-xl md:text-3xl font-bold text-center">
                Create a new account
              </h2>
              <div className="w-4/5 md:w-2/3">
                <Input
                  type="text"
                  className="w-full"
                  name="name"
                  id="name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <p className="pl-2 pt-2 text-sm font-semibold text-red-600 text-right">
                  {nameErr}
                </p>
              </div>
              <div className="w-4/5 md:w-2/3">
                <Input
                  type="email"
                  className="w-full"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="pl-2 pt-2 text-sm font-semibold text-red-600 text-right">
                  {emailErr}
                </p>
              </div>
              <div className="w-4/5 md:w-2/3">
                <Input
                  type="password"
                  className="w-full"
                  name="pass"
                  id="pass"
                  placeholder="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <p className="pl-2 pt-2 text-sm font-semibold text-red-600 text-right">
                  {passErr}
                </p>
              </div>
              <div className="w-4/5 md:w-2/3">
                <Input
                  type="password"
                  className="w-full"
                  name="repass"
                  id="repass"
                  placeholder="Re-type password"
                  value={repass}
                  onChange={(e) => setRepass(e.target.value)}
                  required
                />
                <p className="pl-2 pt-2 text-sm font-semibold text-red-600 text-right">
                  {repassErr}
                </p>
              </div>
              <div className="w-7/8 md:w-2/3 flex flex-row justify-start items-center">
                <Checkbox
                  className="mx-2 md:mx-4"
                  ref={checkBoxRef as React.MutableRefObject<HTMLButtonElement>}
                  required
                />
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I accept the{" "}
                  <span
                    className="underline underline-offset-2 cursor-pointer"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    terms and conditions
                  </span>
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-evenly items-center w-1/2 gap-y-2">
                <Button variant="default">Register</Button>
                <Button variant="link">
                  <Link to="/login">I already have an account</Link>
                </Button>
              </div>
            </form>
          </div>

          <div
            className={
              modal
                ? "" +
                  "fixed h-3/4 w-1/2 bg-background border top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md p-4 overflow-y-auto"
                : "hidden fixed h-3/4 w-1/2 bg-background border top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md p-4 overflow-y-auto"
            }
          >
            <div className="absolute top-0 right-0 ">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setModal(false);
                }}
              >
                <Minimize2 />
              </Button>
            </div>
            <ScrollArea className="h-full">
              <h1 className="text-3xl font-bold">Terms and conditions</h1>
              <div className="">{terms}</div>
            </ScrollArea>
          </div>
        </ScrollArea>
      </RouteAnimation>
    </>
  );
}
